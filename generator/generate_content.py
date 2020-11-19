import argparse

parser: argparse.ArgumentParser = argparse.ArgumentParser(
    prog="generate_content.py",
    description="Grab JSOND and generate content for Pelican.",
)

parser.add_argument("jsond-data-path")
parser.add_argument("output-content-dir")

args: dict = parser.parse_args()


