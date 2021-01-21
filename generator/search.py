"""Everything related to search functionality from the backend."""

from os import makedirs
from os import path
from pathlib import Path
from shutil import rmtree


class SearchIndicesGenerator:
    """This class will generaterate index files for items."""

    # This grows exponentially as 26^letters_per_index.
    letters_per_index: int = 3

    def __init__(
        self,
        *_,
        output_dir: str,
        items_dir: str,
        items: list[str],
    ):
        self.output_dir = output_dir
        self.items_dir = items_dir
        self.items = items
        self.items_dir

    def _ensure_output_dir(self) -> None:
        """Removes output_dir contents if existent and creates it."""
        rmtree(self.output_dir, ignore_errors=True)
        makedirs(self.output_dir)

    def _write_to_index_file(self, term: str, location: str) -> None:
        """Writes path to the matching index.

        Arguments:
        term: str -- Term that must be matched to the proper index files.
        location: str -- The path to be recorded for the matching term index
            files.
        """
        # Get all words in term and make them lowercase if they're char-only.
        words: list[str] = [
            word[:self.letters_per_index].lower().rstrip()
            for word in term.split()
            if word.isalpha()
        ]

        # For each word in the term, ensure the corresponding index file exists
        # or create it, then add the location of the term into to it.
        for word in words:
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
                word_index_file.write(f"{location}\n")

    def generate(self) -> None:
        # Remove previous contents for index files.
        self._ensure_output_dir()

        for item in self.items:
            parent: dict = item["parent"]

            self._write_to_index_file(
                parent["name"],
                path.join(self.items_dir, f"{parent['uniqueId']}.html")
            )
