def quote_value(value: str) -> str:
    value = value.strip()
    if value.lower() == "null":
        return "NULL"

    try:
        float(value)
        return value
    except ValueError:
        escaped = value.replace("'", "''")
        return f"'{escaped}'"


def build_select() -> str:
    table = input("Table name: ").strip()
    columns = input("Columns (comma-separated, or *): ").strip() or "*"
    where = input("WHERE condition (optional): ").strip()

    sql = f"SELECT {columns} FROM {table}"
    if where:
        sql += f" WHERE {where}"
    return sql + ";"


def build_insert() -> str:
    table = input("Table name: ").strip()
    columns_raw = input("Columns (comma-separated): ").strip()
    values_raw = input("Values (comma-separated): ").strip()

    columns = [c.strip() for c in columns_raw.split(",") if c.strip()]
    values = [v.strip() for v in values_raw.split(",")]

    if len(columns) != len(values):
        raise ValueError("Columns count must match values count.")

    formatted_values = ", ".join(quote_value(v) for v in values)
    columns_part = ", ".join(columns)

    return f"INSERT INTO {table} ({columns_part}) VALUES ({formatted_values});"


def build_update() -> str:
    table = input("Table name: ").strip()
    assignments_raw = input("Set values (example: name=John, age=25): ").strip()
    where = input("WHERE condition (required for safety): ").strip()

    if not where:
        raise ValueError("WHERE condition is required for UPDATE.")

    assignments = []
    for part in assignments_raw.split(","):
        if "=" not in part:
            raise ValueError(f"Invalid assignment: {part}")
        col, val = part.split("=", 1)
        assignments.append(f"{col.strip()}={quote_value(val.strip())}")

    set_part = ", ".join(assignments)
    return f"UPDATE {table} SET {set_part} WHERE {where};"


def build_delete() -> str:
    table = input("Table name: ").strip()
    where = input("WHERE condition (required for safety): ").strip()

    if not where:
        raise ValueError("WHERE condition is required for DELETE.")

    return f"DELETE FROM {table} WHERE {where};"


def main() -> None:
    print("Simple SQL Generator")
    print("1) SELECT")
    print("2) INSERT")
    print("3) UPDATE")
    print("4) DELETE")

    choice = input("Choose query type (1-4): ").strip()

    try:
        if choice == "1":
            sql = build_select()
        elif choice == "2":
            sql = build_insert()
        elif choice == "3":
            sql = build_update()
        elif choice == "4":
            sql = build_delete()
        else:
            print("Invalid choice.")
            return

        print("\nGenerated SQL:")
        print(sql)

    except ValueError as error:
        print(f"Error: {error}")


if __name__ == "__main__":
    main()
