import secrets
import string


def generate_password(length: int = 16) -> str:
    if length < 8:
        raise ValueError("Password length should be at least 8.")

    lowercase = string.ascii_lowercase
    uppercase = string.ascii_uppercase
    digits = string.digits
    symbols = "!@#$%^&*()-_=+[]{};:,.?"
    all_chars = lowercase + uppercase + digits + symbols

    # Ensure at least one char from each group
    required = [
        secrets.choice(lowercase),
        secrets.choice(uppercase),
        secrets.choice(digits),
        secrets.choice(symbols),
    ]

    remaining = [secrets.choice(all_chars) for _ in range(length - len(required))]
    password_chars = required + remaining

    # Secure shuffle
    secrets.SystemRandom().shuffle(password_chars)
    return "".join(password_chars)


def generate_unique_passwords(count: int, length: int) -> list[str]:
    passwords = set()

    while len(passwords) < count:
        passwords.add(generate_password(length))

    return list(passwords)


def main() -> None:
    try:
        count = int(input("How many passwords? ").strip() or "1")
        length = int(input("Password length? ").strip() or "16")

        if count < 1:
            print("Count must be at least 1.")
            return

        passwords = generate_unique_passwords(count, length)

        print("\nGenerated unique passwords:")
        for index, password in enumerate(passwords, start=1):
            print(f"{index}. {password}")

    except ValueError as error:
        print(f"Error: {error}")


if __name__ == "__main__":
    main()
