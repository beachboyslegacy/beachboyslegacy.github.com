"""Common stuff we use in this project."""


class MoreThanOneMatchError(Exception):
    pass


class NoMatchFoundError(Exception):
    pass


class ObjectList(list):
    """Special List with .find() method."""

    def find_all(self, *_, **kwargs) -> "ObjectList":
        """Find objects that have keys with matching values."""

        candidates: ObjectList = ObjectList([])
        for obj in self:
            matching_attributes: list[str] = [
                name
                for name, value in kwargs.items()
                if getattr(obj, name) == value
            ]

            if len(matching_attributes) == len(kwargs.items()):
                candidates.append(obj)

        return candidates

    def find(self, *_, **kwargs) -> object:
        """Find one object that matches key/value. If none are found, or more
        than one is found raise an error."""
        candidates: ObjectList = self.find_all(**kwargs)

        if len(candidates) == 1:
            return candidates[0]
        elif len(candidates) > 1:
            raise MoreThanOneMatchError(
                f"More than one match found for attributes: {kwargs}"
            )
        else:
            raise NoMatchFoundError(
                f"Couldn't find a match with attributes: {kwargs}"
            )
