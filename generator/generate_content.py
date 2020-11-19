from argparse import ArgumentParser
from argparse import Namespace

parser: ArgumentParser = ArgumentParser(
    description="Grab JSOND and generate content for Pelican.",
)

parser.add_argument("jsond-data-path")
parser.add_argument("output-content-dir")

args: Namespace = parser.parse_args()

print(args)
