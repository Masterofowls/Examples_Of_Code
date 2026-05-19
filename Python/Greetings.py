def greet_user(username: str) -> str:
    return f"Hello, {username}! Welcome."


def main() -> None:
    username = input("Enter your username: ").strip()

    if not username:
        print("Username cannot be empty.")
        return

    print(greet_user(username))


if __name__ == "__main__":
    main()
