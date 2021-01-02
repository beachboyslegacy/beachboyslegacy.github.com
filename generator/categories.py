"""All operations related to Categories."""

from __future__ import annotations

from json import loads


class Category:
    """Models a categories.json's category."""

    def __init__(self, *_, unique_id, name):
        self.unique_id = unique_id
        self.name = name


class Categories:
    """Models categories.json."""

    def __init__(self, categories_data_filepath):
        categories_data: dict
        with open(categories_data_filepath, "r") as categories_data_file:
            categories_data = loads(categories_data_file.read())

        self.categories: set[Category] = set()
        for category in categories_data["categories"]:
            self.categories.add(Category(
                unique_id=category["uniqueId"],
                name=category["name"],
            ))

    def pretty_name(self, unique_id) -> str:
        """Attempts to return a Categorie's name if found by unique_id.
        Otherwise, None is returned.

        Arguments:
        unique_id: str -- the unique_id by which to find a category.
        """
        for category in self.categories:
            if category.unique_id == unique_id:
                return category.name
