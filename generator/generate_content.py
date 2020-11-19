from argparse import ArgumentParser
from argparse import Namespace
from json import loads

parser: ArgumentParser = ArgumentParser(
    description="Grab JSOND and generate content for Pelican.",
)

parser.add_argument("jsond_data_filepath")
parser.add_argument("output-content-dir")

args: Namespace = parser.parse_args()

data: dict
with open(args.jsond_data_filepath, "r") as jsond_data:
    data = loads(jsond_data.read())

for item in data["items"]:
    print(item["parent"]["uniqueId"])
