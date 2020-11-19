from argparse import ArgumentParser
from argparse import Namespace
from json import loads
from os.path import join

parser: ArgumentParser = ArgumentParser(
    description="Grab JSOND and generate content for Pelican.",
)

parser.add_argument("jsond_data_filepath")
parser.add_argument("output_content_dir")

args: Namespace = parser.parse_args()

data: dict
with open(args.jsond_data_filepath, "r") as jsond_data:
    data = loads(jsond_data.read())

for item in data["items"]:
    unique_id: str = item["parent"]["uniqueId"]

    output_filename: str = join(
        args.output_content_dir,
        f"{unique_id}.markdown"
    )

    with open(output_filename, "w") as content_file:
        content_file.write(f"title: #{unique_id}")
