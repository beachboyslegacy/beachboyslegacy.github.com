"""All operations related to Artists."""

from __future__ import annotations

from .categories import Category
from json import loads


class Artist:
    """Models a artists.json's artist."""

    def __init__(self, *_, unique_id, name, default_category):
        self.unique_id = unique_id
        self.name = name
        self.default_category = default_category
        self.categories: set[Category] = set()


class Artists:
    """Models artists.json."""

    def __init__(self, artists_data_filepath):
        artists_data: dict
        with open(artists_data_filepath, "r") as artists_data_file:
            artists_data = loads(artists_data_file.read())

        self.artists: set[Artist] = set()
        for artist in artists_data["items"]:
            self.artists.add(Artist(
                unique_id=artist["uniqueId"],
                name=artist["name"],
                default_category=artist["default_category"],
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
