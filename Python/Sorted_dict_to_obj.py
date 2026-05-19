from types import SimpleNamespace


def sorted_dict_to_object(data: dict) -> SimpleNamespace:
    sorted_items = dict(sorted(data.items(), key=lambda item: item[0]))
    return SimpleNamespace(**sorted_items)


def main() -> None:
    user_data = {
        "age": 25,
        "name": "Daniel",
        "country": "USA",
        "score": 99,
    }

    obj = sorted_dict_to_object(user_data)

    print("Object:", obj)
    print("Name:", obj.name)
    print("Age:", obj.age)
    print("Country:", obj.country)
    print("Score:", obj.score)


if __name__ == "__main__":
    main()
