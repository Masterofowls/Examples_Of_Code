import re


def greatest_number_from_mixed_string(text: str) -> int:
    numbers = [int(n) for n in re.findall(r"\d+", text)]
    if not numbers:
        raise ValueError("No numbers found in string.")
    return max(numbers)


def main() -> None:
    text = input("Enter mixed string: ").strip()

    try:
        result = greatest_number_from_mixed_string(text)
        print("Greatest number:", result)
    except ValueError as error:
        print("Error:", error)


if __name__ == "__main__":
    main()
