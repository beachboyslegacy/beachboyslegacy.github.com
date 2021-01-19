"""All operations related to Artists."""

from __future__ import annotations

from .categories import Category
from .lib import ObjectList


class Artist:
    """Models a artists.json's artist."""

    def __init__(
        self,
        *_,
        id: str,
        name: str,
        default_category_id: str,
        categories_data: dict,
        index: bool = False,
    ):
        self.id = id
        self.name = name
        self.index = index

        self.categories: ObjectList[Category] = ObjectList([
            Category(
                id=category_data["id"],
                name=category_data["name"],
                template=category_data["template"],
                artist_id=self.id,
                index=(
                    self.index and
                    category_data["id"] == self.default_category_id
                ),
            )
            for category_data in categories_data["items"]
        ])

        self.default_category = self.categories.find(id=default_category_id)

    def get_default_category(self, preferred_category_id) -> Category:
        """Returns a Category that should be used as default. We will try to
        use the preferred category but only if it's non-empty. Otherwise we'll
        use the configured default_category for this artist.

        Arguments:
        preferred_category_id: Category -- id of category we'll try to use if
            it's not empty.
        """
        preferred_category: Category = self.categories.find(
            id=preferred_category_id,
        )

        if preferred_category.items:
            return preferred_category
        else:
            return self.default_category

    def path(self, wanted_category_id=None) -> str:
        """Returns a path to the artist, complete with its default category. If
        the artist is the index artist (typically "all"), and the wanted
        category can't be selected, then we simply return index.html.

        Arguments:
        wanted_category_id: str -- Unique id of category that we'd
            want for the artist (only useful it it has any items). Otherwise,
            we use the default category for the artist.
        """
        wanted_category: str = self.get_default_category(
            wanted_category_id or self.default_category.id
        )

        if self.index and self.default_category.id == wanted_category.id:
            return "index.html"

        return (
            f"artist/{self.id}/"
            f"category/{wanted_category.id}.html"
        )
