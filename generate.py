from argparse import ArgumentParser
from argparse import Namespace
from jinja2 import Template
from json import loads
from os import listdir
from os import makedirs
from os import path
from shutil import copytree
from shutil import rmtree
from typing import Dict
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
    "compilation",
    "boxset",
    "single",
    "variousArtists",
    "bootleg",
]
book_cats: List = ["book"]
video_cats: List = ["video"]

# We'll preload all the templates so we don't have to do it every time.
template_map: Dict = {}
for template_name in listdir(templates_dir):
    with open(path.join(templates_dir, template_name), "r") as template:
        template_map[template_name] = Template(template.read())

# Now, for each category object in the data, we must choose the riht template.
for item in data["items"]:
    parent: dict = item["parent"]

    # Grab all the "true" categories.
    item_cats: List = {
        k: v for k, v in parent["category"].items() if v
    }.keys()

    # We determine the template name by looking at the item's categories.
    template: str
    if [category for category in item_cats if category in album_cats]:
        template = template_map["album.html.jinja2"]
    elif [category for category in item_cats if category in book_cats]:
        template = template_map["book.html.jinja2"]
    elif [category for category in item_cats if category in video_cats]:
        template = template_map["video.html.jinja2"]
    else:
        raise CategoryException(
            f"Ivalid categories for {parent['uniqueId']}"
        )

    # Wirte the generated template to the its item file.
    output_template_path: str = path.join(
        output_dir,
        "items",
        f"{parent['uniqueId']}.html",
    )

    with open(output_template_path, "w") as template_file:
        template_file.write(template.render(item=item))
