from __future__ import annotations

import argparse
import csv
import json
from pathlib import Path
from typing import Any


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write_text(path: Path, content: str) -> None:
    path.write_text(content, encoding="utf-8")
    print(f"Wrote: {path}")


def csv_to_json(input_path: Path, output_path: Path) -> None:
    with input_path.open("r", encoding="utf-8", newline="") as file:
        reader = csv.DictReader(file)
        rows = list(reader)

    output_path.write_text(
        json.dumps(rows, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"Converted CSV -> JSON: {output_path}")


def json_to_csv(input_path: Path, output_path: Path) -> None:
    data: Any = json.loads(read_text(input_path))

    if not isinstance(data, list):
        raise ValueError("JSON must be a list of objects for json->csv conversion.")

    if len(data) == 0:
        output_path.write_text("", encoding="utf-8")
        print(f"Converted JSON -> CSV (empty): {output_path}")
        return

    if not all(isinstance(item, dict) for item in data):
        raise ValueError("All items in JSON array must be objects for json->csv.")

    fieldnames: list[str] = sorted(
        {key for item in data for key in item.keys()},
    )

    with output_path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        for row in data:
            writer.writerow(row)

    print(f"Converted JSON -> CSV: {output_path}")


def txt_to_json(input_path: Path, output_path: Path) -> None:
    lines = [
        line.strip() for line in read_text(input_path).splitlines() if line.strip()
    ]

    output_path.write_text(
        json.dumps(lines, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"Converted TXT -> JSON: {output_path}")


def json_to_txt(input_path: Path, output_path: Path) -> None:
    data: Any = json.loads(read_text(input_path))

    if isinstance(data, list):
        content = "\n".join(str(item) for item in data)
    else:
        content = json.dumps(data, ensure_ascii=False, indent=2)

    write_text(output_path, content)
    print(f"Converted JSON -> TXT: {output_path}")


def convert(input_path: Path, output_path: Path) -> None:
    if not input_path.exists():
        raise FileNotFoundError(f"Input file not found: {input_path}")

    src = input_path.suffix.lower()
    dst = output_path.suffix.lower()

    if src == ".csv" and dst == ".json":
        csv_to_json(input_path, output_path)
        return

    if src == ".json" and dst == ".csv":
        json_to_csv(input_path, output_path)
        return

    if src == ".txt" and dst == ".json":
        txt_to_json(input_path, output_path)
        return

    if src == ".json" and dst == ".txt":
        json_to_txt(input_path, output_path)
        return

    raise ValueError(f"Unsupported conversion: {src} -> {dst}")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Simple file converter (CSV/JSON/TXT).",
    )
    parser.add_argument(
        "--input",
        required=True,
        help="Input file path",
    )
    parser.add_argument(
        "--output",
        required=True,
        help="Output file path",
    )
    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()

    try:
        convert(Path(args.input), Path(args.output))
    except Exception as error:
        print(f"Conversion failed: {error}")


if __name__ == "__main__":
    main()
