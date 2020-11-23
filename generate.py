from argparse import ArgumentParser
from argparse import Namespace
from jinja2 import Template
from json import loads
from os import makedirs
from os import path
from shutil import copytree
from shutil import rmtree
from typing import List

class CategoryException(Exception):
    pass

# Create a command line interface for the generator.
parser: ArgumentParser = ArgumentParser(
    description="Grab JSOND and generate a static website.",
)

parser.add_argument("jsond_data_filepath")
parser.add_argument("--static-resources-dir")
parser.add_argument("--output-dir")
parser.add_argument("--templates-dir")

args: Namespace = parser.parse_args()

jsond_data_filepath: str = args.jsond_data_filepath
static_resources_dir: str = args.static_resources_dir
output_dir: str = args.output_dir or "./www"
templates_dir: str = args.templates_dir or "./templates"

# Load data into memmory.
data: dict
with open(args.jsond_data_filepath, "r") as jsond_data:
    data = loads(jsond_data.read())

# Move static resources if specified.
if static_resources_dir:
    copytree(static_resources_dir, output_dir)

# Process item templates. We'll start by removing old item contents.
items_path: str = path.join(output_dir, "items")
rmtree(items_path, ignore_errors=True)
makedirs(items_path)

# For each item we'll generate an item view. There are various types of items,
# and for each we have a template. We must determine the category to which
# each template belongs and render the right type of template for it.

album_cats: List = [
    "album",
    "collaboration",
    "concert",
    "live",
    "production",
    "sideProject",
]
compilation_cats: List = [
    "compilation",
    "boxset",
    "single",
    "variousArtists",
]
book_cats: List = ["book"]
bootleg_cats: List = ["bootleg"]
video_cats: List = ["video"]

for item in data["items"]:
    parent: dict = item["parent"]

    # Grab all the "true" categories.
    item_cats: List = {
        k:v for k,v in parent["category"].items() if v
    }.keys()

    # We determine the template name by looking at the item's categories.
    template_name: str
    if [category for category in item_cats if category in album_cats]:
        template_name = "album.html.jinja2"
    elif [category for category in item_cats if category in compilation_cats]:
        template_name = "compilation.html.jinja2"
    elif [category for category in item_cats if category in book_cats]:
        template_name = "book.html.jinja2"
    elif [category for category in item_cats if category in bootleg_cats]:
        template_name = "bootleg.html.jinja2"
    elif [category for category in item_cats if category in video_cats]:
        # Grab all the "true" subcats.
        item_subcats: List = {
            k:v for k,v in parent.get("subcategory", {}).items() if v
        }.keys()

        if "live" in item_subcats:
            template_name = "video_live.html.jinja2"
        elif "documentary" in item_subcats:
            template_name = "video_documentary.html.jinja2"
        elif "movie" in item_subcats:
            template_name = "video_movie.html.jinja2"
        else:
            raise CategoryException(
                f"Ivalid video subcategories for {parent['uniqueId']}"
            )
    else:
        raise CategoryException(
            f"Ivalid categories for {parent['uniqueId']}"
        )

    # Generate the template.
    index_template_path: str = path.join(templates_dir, template_name)
    with open(index_template_path, "r") as index_template:
        template: Template = Template(index_template.read())

    # Wirte the generated template to the its item file.
    output_template_path: str = path.join(
        output_dir,
        "items",
        f"{parent['uniqueId']}.html",
    )

    with open(output_template_path, "w") as template_file:
        template_file.write(template.render(item=item))
