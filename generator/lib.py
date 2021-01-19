"""Common stuff we use in this project."""


class ObjectList(list):
    """Special List with .find() method."""

    def find(self, *_, **kwargs) -> object:
        """Find dictionary that has key with matching value."""

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
