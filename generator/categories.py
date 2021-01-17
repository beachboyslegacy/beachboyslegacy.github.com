"""All operations related to Categories."""

from __future__ import annotations


class Category:
    """Models a categories.json's category."""

    def __init__(self, *_, unique_id, name, template, artist_id):
        self.unique_id: str = unique_id
        self.name: str = name
        self.template: str = template
        self.items: list[dict] = []
        self.artist_id: str = artist_id

    def path(self) -> str:
        """Constructs a path to the category, taking into account the artist
        it belongs to."""
        return f"artists/{self.artist_id}/categories/{self.unique_id}.html"


class Categories:
    """Models categories.json."""

    def __init__(self, categories_data: dict, artist_id: str):
        self.artist_id: str = artist_id

        self.categories: list[Category] = [
            Category(
                artist_id=self.artist_id,
                unique_id=category["uniqueId"],
                name=category["name"],
                template=category["template"],
            )
            for category in categories_data["items"]
        ]

    def get(self, unique_id) -> str:
        """Attempts to return a Category if found by unique_id.  Otherwise,
        None is returned.

        Arguments:
        unique_id: str -- the unique_id by which to find a category.
        """
        for category in self.categories:
            if category.unique_id == unique_id:
                return category

    def get_all(self, *_, empty: bool = False) -> list[Category]:
        """Get all categories in this class. If empty is provided true, even
        categories with no items are returned (which is probably more organic
        but ultimately useless most of the time).

        Keyword arguments:
        empty: bool -- Whether to return categories with no items (default
                False).
        """
        return [
            category
            for category in self.categories
            if len(category.items)
        ]
