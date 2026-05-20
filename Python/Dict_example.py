def main() -> None:
    user = {
        "name": "Daniel",
        "age": 25,
        "country": "USA",
    }

    print("Original:", user)

    # get
    print('get("name"):', user.get("name"))
    print('get("email", "not found"):', user.get("email", "not found"))

    # keys, values, items
    print("keys():", list(user.keys()))
    print("values():", list(user.values()))
    print("items():", list(user.items()))

    # update
    user.update({"age": 26, "email": "daniel@example.com"})
    print("after update():", user)

    # setdefault
    user.setdefault("city", "New York")
    user.setdefault("name", "Other Name")  # won't overwrite existing
    print("after setdefault():", user)

    # pop
    removed_email = user.pop("email")
    print("popped email:", removed_email)
    print('after pop("email"):', user)

    # popitem (removes last inserted pair in Python 3.7+)
    last_item = user.popitem()
    print("popitem():", last_item)
    print("after popitem():", user)

    # copy
    user_copy = user.copy()
    print("copy():", user_copy)

    # clear (on copy only, so original stays)
    user_copy.clear()
    print("after clear() on copy:", user_copy)
    print("original still:", user)

    # fromkeys
    default_scores = dict.fromkeys(["math", "science", "english"], 0)
    print("fromkeys():", default_scores)


if __name__ == "__main__":
    main()
