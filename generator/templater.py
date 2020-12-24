from __future__ import annotations

from jinja2 import Template
from os import walk
from os.path import basename
from os.path import join
from os.path import splitext


class Templater:
    """This class is used to generate templates and cache them."""

    def __init__(self, templates_dir):
        self.templates_dir = templates_dir
        self.cache = {}

    def _get(self, filepath) -> tuple[str, Template]:
        """Internal use only fetcher. Memoizes.

        Arguments:
        filepath: str -- path to template file.
        """
        name: str = splitext(basename(filepath))[0]
        template: Template
        if filepath in self.cache:
            template = self.cache[filepath]
        else:
            with open(filepath, "r") as template_file:
                template = Template(template_file.read())

            self.cache[filepath] = template

        return (name, template)

    def get(self, filepath) -> tuple[str, Template]:
        """Return name and Template for template file. Memoizes.

        Arguments:
        filepath: str -- path to template file.
        """
        parsed_filepath: str = join(self.templates_dir, filepath)

        name: str = splitext(basename(parsed_filepath))[0]
        template: Template
        if parsed_filepath in self.cache:
            template = self.cache[parsed_filepath]
        else:
            with open(parsed_filepath, "r") as template_file:
                template = Template(template_file.read())

            self.cache[parsed_filepath] = template

        return (name, template)

    def list(self, subdir=None) -> list[tuple[str, Template]]:
        """Lists all templates in a subdir (or all templates by default).

        Arguments:
        subdir: str -- directory in which to search for templates
            (default self.templates_dir).
        """
        parsed_subdir: str = join(self.templates_dir, subdir or "")

        template_paths: list[str] = []
        for path, dirnames, filenames in walk(parsed_subdir):
            # Find the leaves of the tree.
            if filenames and not dirnames:
                template_paths.extend([
                    join(path, filename) for filename in filenames
                ])

        return [self._get(template_path) for template_path in template_paths]
