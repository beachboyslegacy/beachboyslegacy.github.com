"""All operations related to Artists."""

from __future__ import annotations

from .categories import Categories
from .categories import Category
from copy import deepcopy
from json import loads


class Artist:
    """Models a artists.json's artist."""

    def __init__(
        self,
        *_,
        unique_id: str,
        name: str,
        default_category: Category,
        categories: Categories,
    ):
        self.unique_id = unique_id
        self.name = name
        self.default_category = default_category
        self.categories: Categories = categories

    def get_default_category(
        self,
        preferred_category_unique_id,
    ) -> Category:
        """Returns a Category that should be used as default. We will try to
        use the preferred category but only if it's non-empty. Otherwise we'll
        use the configured default_category for this artist.

        Arguments:
        preferred_category_unique_id: Category -- unique_id of category we'll
            try to use if it's not empty.
        """
        preferred_category: Category = self.categories.get(
            preferred_category_unique_id,
        )

        if preferred_category.items:
            return preferred_category
        else:
            return self.default_category


class Artists:
    """Models artists.json."""

    def __init__(self, artists_data_filepath, categories: Categories):
        artists_data: dict
        with open(artists_data_filepath, "r") as artists_data_file:
            artists_data = loads(artists_data_file.read())

        self.artists: list[Artist] = []
        for artist in artists_data["items"]:
            self.artists.append(Artist(
                unique_id=artist["uniqueId"],
                name=artist["name"],
                default_category=categories.get(artist["default_category"]),
                categories=deepcopy(categories),
            ))

    def get(self, name) -> str:
        """Attempts to return an Artist if found by name.  Otherwise, None
        is returned.

        Arguments:
        unique_id: str -- the unique_id by which to find a artist.
        """
        for artist in self.artists:
            if artist.name == name:
                return artist
