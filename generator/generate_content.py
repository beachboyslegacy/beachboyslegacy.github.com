from argparse import ArgumentParser
from argparse import Namespace
from json import loads
from os import listdir
from os import path
from shutil import copytree
from shutil import rmtree

parser: ArgumentParser = ArgumentParser(
    description="Grab JSOND and generate a static website.",
)

parser.add_argument("jsond_data_filepath")
parser.add_argument("static_resources_dir")
parser.add_argument("output_dir")

args: Namespace = parser.parse_args()

jsond_data_filepath: str = args.jsond_data_filepath
static_resources_dir: str = args.static_resources_dir
output_dir: str = args.output_dir

# Load data into memmory.
data: dict
with open(args.jsond_data_filepath, "r") as jsond_data:
    data = loads(jsond_data.read())

# Let's remove the output directory and re-create it.
rmtree(output_dir)

# Move static resources into place first.
copytree(static_resources_dir, output_dir)
