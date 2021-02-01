"""Everything related to search functionality from the backend."""

from os import makedirs
from os import path
from pathlib import Path
from shutil import rmtree


class SearchIndicesGenerator:
    """This class will generaterate index files for items."""

    # This grows exponentially as 26^letters_per_index.
    letters_per_index: int = 3

    def __init__(self, *_, output_dir: str, items: list[str]):
        self.output_dir = output_dir
        self.items = items
        self._indexed_terms = set()

    def _ensure_output_dir(self) -> None:
        """Removes output_dir contents if existent and creates it."""
        rmtree(self.output_dir, ignore_errors=True)
        makedirs(self.output_dir)

    def _write_to_index_file(self, term: str, locator: str) -> None:
        """Writes path to the matching index.

        Arguments:
        term: str -- Term that must be matched to the proper index files.
        locator: str -- The path to be recorded for the matching term index
            files.
        """
        # Get all words in term and make them lowercase if they're char-only.
        words: list[str] = [
            word[:self.letters_per_index].lower().rstrip()
            for word in term.split()
            if word[:self.letters_per_index].isalpha()
        ]

        for word in words:
            # We'll keep track of everything we indexed so we can generate an
            # availability report.
            self._indexed_terms.add(word)

            word_index_file_path: Path = Path(path.join(
                self.output_dir,
                f"{word}.txt",
            ))

            file_op: str
            if word_index_file_path.is_file():
                file_op = "a"
            else:
                file_op = "w"

            with word_index_file_path.open(file_op) as word_index_file:
                word_index_file.write(f"{locator}\n")

    def generate(self) -> None:
        # Remove previous contents for index files.
        self._ensure_output_dir()

        for item in self.items:
            parent: dict = item["parent"]
            name: str = parent["name"]
            alternateName: str = parent["alternateName"]
            unique_id: str = parent["uniqueId"]
            release_year: str = parent["releaseYear"]

            parsed_name: str
            if alternateName:
                parsed_name = f"{name}: {alternateName}"
            else:
                parsed_name = name

            artist: str
            try:
                artist = parent["byArtist"]
            except KeyError:
                artist = parent["aboutArtist"]

            locator: str = f"{unique_id};{parsed_name};{artist};{release_year}"
            self._write_to_index_file(name, locator)

        self._write_available_report()

    def _write_available_report(self) -> None:
        """Writes an available.txt file with all terms that were indexed."""
        with Path(
            path.join(self.output_dir, "available.txt"),
        ).open("w") as available_file:
            for term in self._indexed_terms:
                available_file.write(f"{term}\n")
