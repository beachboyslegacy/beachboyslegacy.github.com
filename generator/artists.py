"""All operations related to Artists."""

from __future__ import annotations

from .categories import Categories
from .categories import Category
from json import loads


class Artist:
    """Models a artists.json's artist."""

    def __init__(
        self,
        *_,
        unique_id: str,
        name: str,
        default_category_id: str,
        categories_data: dict,
    ):
        self.unique_id = unique_id
        self.name = name

        self.categories: Categories = Categories(
            categories_data=categories_data,
            artist_id=self.unique_id,
        )

        self.default_category = self.categories.get(default_category_id)

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

    def path(self, preferred_category_unique_id=None) -> str:
        """Returns a path to the artist, complete with its default category.

        Arguments:
        preferred_category_unique_id: str -- Unique id of category that we'd
            want for the artist (only useful it it has any items). Otherwise,
            we use the default category for the artist.
        """
        parsed_preferred_category_unique_id: str = self.get_default_category(
            preferred_category_unique_id or self.default_category_id
        ).unique_id

        return (
            f"artists/{self.unique_id}/"
            f"categories/{parsed_preferred_category_unique_id}.html"
        )


class Artists:
    """Models artists.json."""

    def __init__(self, artists_data_filepath, categories_data_filepath):
        artists_data: dict
        with open(artists_data_filepath, "r") as artists_data_file:
            artists_data = loads(artists_data_file.read())

        categories_data: dict
        with open(categories_data_filepath, "r") as categories_data_file:
            categories_data = loads(categories_data_file.read())

        self.artists: list[Artist] = []
        for artist in artists_data["items"]:
            self.artists.append(Artist(
                unique_id=artist["uniqueId"],
                name=artist["name"],
                default_category_id=artist["default_category"],
                categories_data=categories_data,
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

    def get_all(self, category_unique_id: str) -> list[Artist]:
        """Returns all Artists that have items in provided category.

        Arguments:
        category_unique_id: str -- Unique ID for Category that must have items
            for the Artist to be considered.
        """
        return [
            artist
            for artist in self.artists
            if artist.categories.get(category_unique_id).items
        ]
