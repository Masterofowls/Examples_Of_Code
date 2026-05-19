import time


def countdown(total_seconds: int) -> None:
    while total_seconds >= 0:
        minutes, seconds = divmod(total_seconds, 60)
        print(f"\rTime left: {minutes:02d}:{seconds:02d}", end="")
        time.sleep(1)
        total_seconds -= 1
    print("\nTime is up!")


def main() -> None:
    try:
        seconds = int(input("Enter countdown time in seconds: ").strip())
        if seconds < 0:
            print("Please enter a non-negative number.")
            return
        countdown(seconds)
    except ValueError:
        print("Invalid input. Please enter a whole number.")


if __name__ == "__main__":
    main()
