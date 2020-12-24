from __future__ import annotations

from jinja2 import Template
from os.path import basename
from os.path import join
from os.path import splitext


class Templater:

    def __init__(self, templates_dir):
        self.templates_dir = templates_dir
        self.cache = {}

    def get(self, filepath) -> tuple[str, Template]:
        """Return name and Template for template file. Memoizes.

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
