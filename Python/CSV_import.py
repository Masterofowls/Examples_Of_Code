import csv
from pathlib import Path


def import_csv(file_path: str, delimiter: str = ",") -> list[dict[str, str]]:
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"File not found: {path}")
    if path.suffix.lower() != ".csv":
        raise ValueError("Please provide a .csv file")

    with path.open("r", newline="", encoding="utf-8-sig") as file:
        reader = csv.DictReader(file, delimiter=delimiter)
        if reader.fieldnames is None:
            raise ValueError("CSV has no header row")
        return [row for row in reader]


def main() -> None:
    file_path = input("Enter CSV file path: ").strip()
    delimiter = input("Delimiter (press Enter for comma): ").strip() or ","

    try:
        rows = import_csv(file_path, delimiter)
        print(f"Imported {len(rows)} rows.")

        if rows:
            print("Columns:", ", ".join(rows[0].keys()))
            print("Preview:")
            for index, row in enumerate(rows[:5], start=1):
                print(f"{index}. {row}")
    except (FileNotFoundError, ValueError) as error:
        print(f"Error: {error}")
    except Exception as error:
        print(f"Unexpected error: {error}")


if __name__ == "__main__":
    main()
