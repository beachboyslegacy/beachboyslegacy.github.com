from __future__ import annotations

from argparse import ArgumentParser
from argparse import Namespace
from generator import Generator


# Create a command line interface for the generator.
parser: ArgumentParser = ArgumentParser(
    description="Grab JSOND and generate a static website.",
)

parser.add_argument("jsond_data_filepath")
parser.add_argument("--static-resources-dir")
parser.add_argument("--output-dir")
parser.add_argument("--templates-dir")
parser.add_argument("--base-url")

args: Namespace = parser.parse_args()

jsond_data_filepath: str = args.jsond_data_filepath
static_resources_dir: str = args.static_resources_dir
output_dir: str = args.output_dir or "./www"
templates_dir: str = args.templates_dir or "./templates"
base_url: str = args.base_url or "https://beachboyslegacy.com"

Generator(
    jsond_data_filepath=jsond_data_filepath,
    static_resources_dir=static_resources_dir,
    output_dir=output_dir,
    templates_dir=templates_dir,
    base_url=base_url,
).generate()
