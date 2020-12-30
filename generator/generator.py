from __future__ import annotations

from .templater import Templater
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
        jsond_data_filepath: str,
        static_resources_dir: str,
        output_dir: str,
        templates_dir: str,
        base_url: str,
    ):
        self.jsond_data_filepath = jsond_data_filepath
        self.static_resources_dir = static_resources_dir
        self.output_dir = output_dir
        self.templates_dir = templates_dir
        self.base_url = base_url

    def generate(self):
        """Generates static HTML for templated items."""

        # Load data into memmory.
        data: dict
        with open(self.jsond_data_filepath, "r") as jsond_data:
            data = loads(jsond_data.read())

        # Move static resources if specified.
        if self.static_resources_dir:
            copytree(self.static_resources_dir, self.output_dir)

        # Process item templates. We'll start by removing old item contents.
        items_path: str = path.join(self.output_dir, "items")
        rmtree(items_path, ignore_errors=True)
        makedirs(items_path)

        # For each item we'll generate an item view. There are various types of
        # items, and for each we have a template. We must determine the
        # category to which each template belongs and render the right type of
        # template for it.
        album_cats: list[str] = [
            "album",
            "collaboration",
            "concert",
            "live",
            "production",
            "sideProject",
            "compilation",
            "boxset",
            "single",
            "variousArtists",
            "bootleg",
            "rsd",
            "christmas",
        ]
        book_cats: list[str] = ["book"]
        video_cats: list[str] = ["video"]

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

        artists: dict = {}
        for item in data["items"]:
            parent: dict = item["parent"]
            # Grab all the "true" categories.
            item_cats: list[str] = {
                k: v for k, v in parent["category"].items() if v
            }.keys()

            # We determine the template name by looking at the item's
            # categories.
            template: str
            if [cat for cat in item_cats if cat in album_cats]:
                _, template = templater.get("items/album.html.jinja2")
            elif [cat for cat in item_cats if cat in book_cats]:
                _, template = templater.get("items/book.html.jinja2")
            elif [cat for cat in item_cats if cat in video_cats]:
                _, template = templater.get("items/video.html.jinja2")
            else:
                raise CategoryException(
                    f"Ivalid categories for {parent['uniqueId']}"
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

            # Set artist and extend items per artist.
            artist_name: str
            try:
                artist_name = parent["byArtist"]
            except KeyError:
                artist_name = parent["aboutArtist"]

            if artist_name in artists:
                for category in item_cats:
                    if category in artists[artist_name]:
                        artists[artist_name][category].append(item)
                    else:
                        artists[artist_name][category] = [item]
            else:
                artists[artist_name] = {
                    category: [item] for category in item_cats
                }

        # Now let's render all the artist category templates.
        _, artist_category_template = templater.get(
            "artist_categories/artist_category.html.jinja2",
        )

        for artist_name, categories in artists.items():
            print(
                f"Artist '{artist_name}' has "
                f"{len(categories)} categories."
            )

            # There will be one template per artist category.
            output_artist_categories_dir: str = Path(path.join(
                "artists",
                artist_name,
                "categories",
            ))
            Path(output_artist_categories_dir).mkdir(
                parents=True,
                exist_ok=True,
            )
            for category_name, category_items in categories.items():
                print(
                    "    "
                    f"category {category_name} "
                    f"has {len(category_items)} items."
                )

                output_template_path: str = Path(path.join(
                    output_artist_categories_dir,
                    f"{category_name}.html",
                ))

                rendered_partials: dict = {
                    template_name: template.render(
                        artist_name=artist_name,
                        category_name=category_name,
                        items=category_items,
                        categories=list(categories.keys()),
                        artists=list(artists.keys()),
                        base_url=self.base_url,
                    ) for template_name, template in partials
                }

                with output_template_path.open("w") as output_file:
                    output_file.write(artist_category_template.render(
                        artist_name=artist_name,
                        category_name=category_name,
                        items=category_items,
                        categories=list(categories.keys()),
                        artists=list(artists.keys()),
                        partials=rendered_partials,
                        base_url=self.base_url,
                    ))
