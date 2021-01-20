"""All operations related to Categories."""

from __future__ import annotations


class Category:
    """Models a categories.json's category."""

    def __init__(
        self,
        *_,
        id,
        name,
        template,
        artist_id,
        index=False,
    ):
        self.id: str = id
        self.name: str = name
        self.template: str = template
        self.items: list[dict] = []
        self.artist_id: str = artist_id
        self.index: bool = index

    def path(self) -> str:
        """Constructs a path to the category, taking into account the artist
        it belongs to. If this an index category, we'll return index.html."""

        if self.index:
            return "index.html"

        return f"artist/{self.artist_id}/category/{self.id}.html"
