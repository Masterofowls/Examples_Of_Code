import argparse
from pathlib import Path


def load_env_file(file_path: Path) -> dict[str, str]:
    env_vars: dict[str, str] = {}

    if not file_path.exists():
        return env_vars

    for raw_line in file_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()

        if not line or line.startswith("#"):
            continue

        if "=" not in line:
            continue

        key, value = line.split("=", 1)
        env_vars[key.strip()] = value.strip()

    return env_vars


def save_env_file(file_path: Path, env_vars: dict[str, str]) -> None:
    lines = [f"{key}={value}" for key, value in sorted(env_vars.items())]
    file_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Saved: {file_path}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Simple .env processor")
    parser.add_argument("--file", default=".env", help="Path to .env file")
    parser.add_argument("--get", help="Get value by key")
    parser.add_argument(
        "--set", nargs=2, metavar=("KEY", "VALUE"), help="Set key value"
    )
    parser.add_argument("--delete", help="Delete key")
    parser.add_argument("--list", action="store_true", help="List all keys")
    args = parser.parse_args()

    env_path = Path(args.file)
    env_vars = load_env_file(env_path)

    if args.get:
        value = env_vars.get(args.get)
        if value is None:
            print("Key not found.")
        else:
            print(value)
        return

    if args.set:
        key, value = args.set
        env_vars[key] = value
        save_env_file(env_path, env_vars)
        return

    if args.delete:
        if args.delete in env_vars:
            del env_vars[args.delete]
            save_env_file(env_path, env_vars)
        else:
            print("Key not found.")
        return

    if args.list:
        if not env_vars:
            print("No variables found.")
            return
        for key, value in env_vars.items():
            print(f"{key}={value}")
        return

    parser.print_help()


if __name__ == "__main__":
    main()
