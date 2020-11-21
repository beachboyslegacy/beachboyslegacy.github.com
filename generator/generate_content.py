from argparse import ArgumentParser
from argparse import Namespace
from jinja2 import Template
from json import loads
from os import path
from shutil import copytree
from shutil import rmtree
from typing import List

parser: ArgumentParser = ArgumentParser(
    description="Grab JSOND and generate a static website.",
)

parser.add_argument("jsond_data_filepath")
parser.add_argument("--static-resources-dir")
parser.add_argument("--output-dir")
parser.add_argument("--templates-dir")

args: Namespace = parser.parse_args()

jsond_data_filepath: str = args.jsond_data_filepath
static_resources_dir: str = args.static_resources_dir or "./static_resources"
output_dir: str = args.output_dir or "./www"
templates_dir: str = args.templates_dir or "./templates"

# Load data into memmory.
data: dict
with open(args.jsond_data_filepath, "r") as jsond_data:
    data = loads(jsond_data.read())

# Let's remove the output directory and re-create it.
rmtree(output_dir)

# Move static resources into place first.
copytree(static_resources_dir, output_dir)

# Process index template.
index_template_path: str = path.join(templates_dir, "index.html.jinja2")
with open(index_template_path, "r") as index_template:
    template: Template = Template(index_template.read())

# The artists list is prefixed.
# TODO: Grab dynamically from data?
artists: List = [
    {"artist": "The Beach Boys", "artistclass": "bb"},
    {"artist": "Brian Wilson", "artistclass": "bw"},
    {"artist": "Dennis Wilson", "artistclass": "dw"},
    {"artist": "Carl Wilson", "artistclass": "cw"},
    {"artist": "Mike Love", "artistclass": "ml"},
    {"artist": "Al Jardine", "artistclass": "aj"},
    {"artist": "David Marks", "artistclass": "dm"},
    {"artist": "Bruce Johnston", "artistclass": "bj"},
]

# The category list is prefixed.
# TODO: Grab dynamically from data?
categories: List = [
    "The Beach Boys",
    "Brian Wilson",
    "Dennis Wilson",
    "Carl Wilson",
    "Mike Love",
    "Al Jardine",
    "David Marks",
    "Bruce Johnston",
]

with open(path.join(output_dir, "index.html"), "w") as index_file:
    index_file.write(template.render(
        artists=artists,
        categories=categories,
        parents=[item["parent"] for item in data["items"]],
    ))
