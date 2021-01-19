from generator import ObjectList
from unittest import TestCase


class MockObject:
    def __init__(self, *_, foo, bar):
        self.foo: str = foo
        self.bar: str = bar


class TestObjectList(TestCase):
    def test_finds_works_with_one_filter(self):
        some_object: MockObject = MockObject(foo="baz", bar="biz")
        another_object: MockObject = MockObject(foo="bez", bar="biz")
        yet_another_object: MockObject = MockObject(foo="baz", bar="boz")

        some_object_list: ObjectList = ObjectList([
            some_object,
            another_object,
            yet_another_object,
        ])

        expected_found: ObjectList = ObjectList([
            some_object,
            another_object,
        ])

        actual_found: ObjectList = some_object_list.find(bar="biz")

        self.assertEqual(actual_found, expected_found)

    def test_finds_works_with_two_filters(self):
        some_object: MockObject = MockObject(foo="baz", bar="biz")
        another_object: MockObject = MockObject(foo="bez", bar="biz")
        yet_another_object: MockObject = MockObject(foo="baz", bar="boz")

        some_object_list: ObjectList = ObjectList([
            some_object,
            another_object,
            yet_another_object,
        ])

        expected_found: ObjectList = ObjectList([
            another_object,
        ])

        actual_found: ObjectList = some_object_list.find(foo="bez", bar="biz")

        self.assertEqual(actual_found, expected_found)

    def test_finds_works_when_no_matches(self):
        some_object: MockObject = MockObject(foo="baz", bar="biz")
        another_object: MockObject = MockObject(foo="bez", bar="biz")
        yet_another_object: MockObject = MockObject(foo="baz", bar="boz")

        some_object_list: ObjectList = ObjectList([
            some_object,
            another_object,
            yet_another_object,
        ])

        expected_found: ObjectList = ObjectList([])

        actual_found: ObjectList = some_object_list.find(foo="buz", bar="biz")

        self.assertEqual(actual_found, expected_found)

    def test_errors_when_attribute_is_not_on_object(self):
        some_object: MockObject = MockObject(foo="baz", bar="biz")
        another_object: MockObject = MockObject(foo="bez", bar="biz")
        yet_another_object: MockObject = MockObject(foo="baz", bar="boz")

        some_object_list: ObjectList = ObjectList([
            some_object,
            another_object,
            yet_another_object,
        ])

        with self.assertRaises(AttributeError):
            some_object_list.find(non_existent="attr")
