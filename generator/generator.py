from __future__ import annotations

from .templater import Templater
from jinja2 import Template
from json import loads
from os import makedirs
from os import path
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
    ):
        self.jsond_data_filepath = jsond_data_filepath
        self.static_resources_dir = static_resources_dir
        self.output_dir = output_dir
        self.templates_dir = templates_dir

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
        artists: dict = {}
        for item in data["items"]:
            parent: dict = item["parent"]

            # Set artist and extend items per artist.
            if "byArtist" in parent:
                artist_name: str = parent["byArtist"]
                if artist_name in artists:
                    artists[artist_name].extend(item)
                else:
                    artists[artist_name] = [item]

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
                    partials=rendered_partials
                ))

        for name, items in artists.items():
            print(f"Artist '{name}' has {len(items)} items.")