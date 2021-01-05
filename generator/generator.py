from __future__ import annotations

from .artists import Artist
from .artists import Artists
from .categories import Categories
from .categories import Category
from .templater import Templater
from datetime import datetime
from jinja2 import Template
from json import loads
from os import makedirs
from os import path
from pathlib import Path
from shutil import copytree
from shutil import rmtree


class CategoryException(Exception):
    pass


class Generator:
    """This class is used to generate static HTML from templates."""

    def __init__(
        self,
        *_,
        data_dir: str,
        static_resources_dir: str,
        output_dir: str,
        templates_dir: str,
        base_url: str,
    ):
        self.data_dir = data_dir
        self.static_resources_dir = static_resources_dir
        self.output_dir = output_dir
        self.templates_dir = templates_dir
        self.base_url = base_url

    def generate(self):
        """Generates static HTML for templated items."""

        # Load data into memmory.
        data: dict
        items_data_filepath: str = path.join(self.data_dir, "data.json")
        with open(items_data_filepath, "r") as items_data:
            data = loads(items_data.read())

        # We'll load artist and category data too.
        categories_data_filepath: str = path.join(
            self.data_dir,
            "categories.json",
        )

        artists_data_filepath: str = path.join(self.data_dir, "artists.json")
        artists_data: Artists = Artists(
            artists_data_filepath,
            Categories(categories_data_filepath),
        )

        # Move static resources if specified.
        if self.static_resources_dir:
            copytree(self.static_resources_dir, self.output_dir)

        # Process item templates. We'll start by removing old item contents.
        items_path: str = path.join(self.output_dir, "items")
        rmtree(items_path, ignore_errors=True)
        makedirs(items_path)

        # We're gonig to use some templates to generate items.
        templater: Templater = Templater(self.templates_dir)

        # We'll load all partials since they'll be used in the items templates.
        partials: list[tuple[str, Template]] = templater.list("partials")

        # Now, for each category object in the data, we must choose the right
        # template. Since we're going to do artists next and we're going to
        # have tot traverse the data anyway, we'll take the opportunity to
        # grab all items belonging to each artist.
        # We'll start by removing old item contents.
        artists_path: str = path.join(self.output_dir, "artists")
        rmtree(artists_path, ignore_errors=True)
        makedirs(artists_path)

        for item in data["items"]:
            parent: dict = item["parent"]
            # Let's add this category to the artist. It can be byArtist or
            # aboutArtist depending on the nature of the item's data (i.e:
            # album vs book).
            artist_name: str
            try:
                artist_name = parent["byArtist"]
            except KeyError:
                artist_name = parent["aboutArtist"]

            # Grab all the "true" categories. We'll map each to a Category
            # object to make it easier to track items.
            artist: Artist = artists_data.get(artist_name)
            template_name: str
            for category, applies in parent["category"].items():
                if applies:
                    category: Category = artist.categories.get(category)
                    template_name = category.template
                    category.items.append(item)

            # We maintain an artificial category named "Latest" that contains
            # any item published in the last 4 years.
            years_passed: int = (
                datetime.today().year -
                int(item["parent"]["releaseYear"])
            )
            if years_passed < 4:
                latest_category: Category = artist.categories.get("new")

                latest_category.items.append(item)

            # We'll just take the last category's template. They *should* all
            # be the same, but we wont validate that here.
            _, template = templater.get(
                template_name
            )

            # Wirte the generated template to the its item file.
            output_template_path: str = path.join(
                self.output_dir,
                "items",
                f"{parent['uniqueId']}.html",
            )

            rendered_partials: dict = {
                name: template.render(item=item) for name, template in partials
            }

            with open(output_template_path, "w") as template_file:
                template_file.write(template.render(
                    item=item,
                    partials=rendered_partials,
                    base_url=self.base_url,
                ))

        # Now let's render all the artist category templates.
        _, artist_category_template = templater.get(
            "artist_categories/artist_category.html.jinja2",
        )

        for artist in artists_data.artists:
            print(
                f"Artist '{artist.name}' has "
                f"{len(artist.categories.get_all())} categories."
            )

            # There will be one template per artist and category.
            output_artist_categories_dir: str = Path(path.join(
                "artists",
                artist.unique_id,
                "categories",
            ))
            Path(output_artist_categories_dir).mkdir(
                parents=True,
                exist_ok=True,
            )

            for category in artist.categories.get_all():
                print(
                    "    "
                    f"category {category.name} "
                    f"has {len(category.items)} items."
                )

                output_template_path: str = Path(path.join(
                    output_artist_categories_dir,
                    f"{category.unique_id}.html",
                ))

                rendered_partials: dict = {
                    template_name: template.render(
                        base_url=self.base_url,
                    ) for template_name, template in partials
                }

                with output_template_path.open("w") as output_file:
                    output_file.write(artist_category_template.render(
                        artist=artist,
                        category=category,
                        items=sorted(
                            category.items,
                            key=lambda item: item["parent"]["releaseYear"],
                            reverse=True,
                        ),
                        categories=artist.categories.get_all(),
                        artists=artists_data.get_all(category.unique_id),
                        base_url=self.base_url,
                        partials=rendered_partials,
                    ))
