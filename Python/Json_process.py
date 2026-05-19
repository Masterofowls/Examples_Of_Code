import json
from pathlib import Path
from typing import Any


def load_json(file_path: Path) -> Any:
    with file_path.open("r", encoding="utf-8") as file:
        return json.load(file)


def save_json(file_path: Path, data: Any) -> None:
    with file_path.open("w", encoding="utf-8") as file:
        json.dump(data, file, indent=2, ensure_ascii=False)
    print(f"Saved: {file_path}")


def get_nested_value(data: Any, path: str) -> Any:
    current = data
    for key in path.split("."):
        if isinstance(current, dict) and key in current:
            current = current[key]
        else:
            raise KeyError(f"Path not found: {path}")
    return current


def main() -> None:
    file_input = input("Enter JSON file path: ").strip()
    if not file_input:
        print("File path is required.")
        return

    file_path = Path(file_input)
    if not file_path.exists():
        print("File not found.")
        return

    try:
        data = load_json(file_path)
    except json.JSONDecodeError as error:
        print(f"Invalid JSON: {error}")
        return
    except Exception as error:
        print(f"Error reading file: {error}")
        return

    print("\nPretty JSON:")
    print(json.dumps(data, indent=2, ensure_ascii=False))

    key_path = input(
        "\nEnter key path to read (example: user.name), or press Enter to skip: "
    ).strip()
    if key_path:
        try:
            value = get_nested_value(data, key_path)
            print(f'Value at "{key_path}": {value}')
        except KeyError as error:
            print(error)

    save_choice = input("\nSave pretty JSON to new file? (y/n): ").strip().lower()
    if save_choice == "y":
        output_path = file_path.with_name(f"{file_path.stem}_pretty.json")
        save_json(output_path, data)


if __name__ == "__main__":
    main()
