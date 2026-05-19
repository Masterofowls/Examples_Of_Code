# Birthday_calc.py
from datetime import date


def main() -> None:
    raw = input("Enter your birthday (YYYY-MM-DD): ").strip()
    try:
        bday = date.fromisoformat(raw)
    except ValueError:
        print("Invalid date format. Use YYYY-MM-DD.")
        return

    today = date.today()
    if bday > today:
        print("Birthday is in the future.")
        return

    # Age
    age = today.year - bday.year - ((today.month, today.day) < (bday.month, bday.day))

    # Next birthday
    try:
        next_bd = bday.replace(year=today.year)
    except ValueError:  # Feb 29 in non-leap year
        next_bd = date(today.year, 3, 1)
    if next_bd < today:
        try:
            next_bd = bday.replace(year=today.year + 1)
        except ValueError:
            next_bd = date(today.year + 1, 3, 1)

    days_lived = (today - bday).days
    days_until = (next_bd - today).days
    weekday = bday.strftime("%A")

    print(f"You were born on a {weekday}.")
    print(f"Age: {age} years")
    print(f"Days lived: {days_lived:,}")
    if days_until == 0:
        print("🎉 Happy birthday — it is today!")
    else:
        print(
            f"Days until next birthday: {days_until} ({next_bd.strftime('%A, %B %d, %Y')})"
        )


if __name__ == "__main__":
    main()
