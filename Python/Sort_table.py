def to_sortable(value: str):
    value = value.strip()
    if value == "":
        return value
    try:
        if "." in value:
            return float(value)
        return int(value)
    except ValueError:
        return value.lower()


def get_headers() -> list[str]:
    while True:
        raw = input("Enter column names (comma-separated): ").strip()
        headers = [h.strip() for h in raw.split(",") if h.strip()]
        if headers:
            return headers
        print("Please enter at least one column.")


def get_positive_int(prompt: str) -> int:
    while True:
        raw = input(prompt).strip()
        try:
            value = int(raw)
            if value > 0:
                return value
        except ValueError:
            pass
        print("Enter a valid number greater than 0.")


def get_rows(headers: list[str], row_count: int) -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    print("\nEnter row values:")
    for i in range(row_count):
        print(f"Row {i + 1}:")
        row: dict[str, str] = {}
        for header in headers:
            row[header] = input(f"  {header}: ").strip()
        rows.append(row)
    return rows


def print_table(headers: list[str], rows: list[dict[str, str]]) -> None:
    widths = {header: len(header) for header in headers}
    for row in rows:
        for header in headers:
            widths[header] = max(widths[header], len(str(row.get(header, ""))))

    header_line = " | ".join(header.ljust(widths[header]) for header in headers)
    separator = "-+-".join("-" * widths[header] for header in headers)

    print("\n" + header_line)
    print(separator)
    for row in rows:
        line = " | ".join(
            str(row.get(header, "")).ljust(widths[header]) for header in headers
        )
        print(line)


def choose_sort_column(headers: list[str]) -> str:
    while True:
        sort_by = input(f"\nSort by column {headers}: ").strip()
        if sort_by in headers:
            return sort_by
        print("Invalid column name.")


def choose_sort_order() -> bool:
    while True:
        order = input("Sort order (asc/desc): ").strip().lower()
        if order in ("asc", "desc"):
            return order == "desc"
        print("Please type asc or desc.")


def sort_rows(
    rows: list[dict[str, str]], sort_by: str, descending: bool
) -> list[dict[str, str]]:
    return sorted(
        rows,
        key=lambda row: to_sortable(row.get(sort_by, "")),
        reverse=descending,
    )


def main() -> None:
    headers = get_headers()
    row_count = get_positive_int("How many rows? ")
    rows = get_rows(headers, row_count)

    while True:
        sort_by = choose_sort_column(headers)
        descending = choose_sort_order()

        sorted_rows = sort_rows(rows, sort_by, descending)
        print_table(headers, sorted_rows)

        again = input("\nSort again with another column/order? (y/n): ").strip().lower()
        if again != "y":
            print("Done.")
            break


if __name__ == "__main__":
    main()
