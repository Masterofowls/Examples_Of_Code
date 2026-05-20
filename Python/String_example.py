def main() -> None:
    text = "  Hello Python World  "
    csv_text = "apple,banana,grape"
    mixed = "pyTHon123"

    print("Original:", repr(text))
    print("strip():", text.strip())
    print("lower():", text.lower())
    print("upper():", text.upper())
    print("title():", text.title())
    print('replace("World", "Developers"):', text.replace("World", "Developers"))
    print('find("Python"):', text.find("Python"))
    print('startswith("  Hello"):', text.startswith("  Hello"))
    print('endswith("  "):', text.endswith("  "))
    print('count("o"):', text.count("o"))
    print()

    words = csv_text.split(",")
    print('split(","):', words)
    print('join with " | " :', " | ".join(words))
    print()

    print('isalpha() on "Hello":', "Hello".isalpha())
    print('isdigit() on "12345":', "12345".isdigit())
    print("isalnum() on mixed:", mixed.isalnum())
    print()

    name = "Daniel"
    age = 25
    print(f"f-string example: Name = {name}, Age = {age}")


if __name__ == "__main__":
    main()
