from __future__ import annotations

import argparse
from pathlib import Path

from cryptography.fernet import Fernet, InvalidToken


def generate_key_file(key_path: Path) -> None:
    key = Fernet.generate_key()
    key_path.write_bytes(key)
    print(f"Key generated: {key_path}")


def load_fernet(key_path: Path) -> Fernet:
    if not key_path.exists():
        raise FileNotFoundError(
            f"Key file not found: {key_path}. Generate one with --generate-key."
        )

    key = key_path.read_bytes().strip()
    return Fernet(key)


def encrypt_text(fernet: Fernet, plain_text: str) -> str:
    token = fernet.encrypt(plain_text.encode("utf-8"))
    return token.decode("utf-8")


def decrypt_text(fernet: Fernet, cipher_text: str) -> str:
    try:
        plain = fernet.decrypt(cipher_text.encode("utf-8"))
        return plain.decode("utf-8")
    except InvalidToken as error:
        raise ValueError("Invalid token or wrong key.") from error


def encrypt_file(fernet: Fernet, input_file: Path, output_file: Path) -> None:
    if not input_file.exists():
        raise FileNotFoundError(f"Input file not found: {input_file}")

    data = input_file.read_bytes()
    encrypted = fernet.encrypt(data)
    output_file.write_bytes(encrypted)
    print(f"Encrypted file written: {output_file}")


def decrypt_file(fernet: Fernet, input_file: Path, output_file: Path) -> None:
    if not input_file.exists():
        raise FileNotFoundError(f"Input file not found: {input_file}")

    data = input_file.read_bytes()

    try:
        decrypted = fernet.decrypt(data)
    except InvalidToken as error:
        raise ValueError(
            "Cannot decrypt file: invalid key or corrupted file."
        ) from error

    output_file.write_bytes(decrypted)
    print(f"Decrypted file written: {output_file}")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Python encryptor/decryptor (Fernet).")

    parser.add_argument(
        "--key-file",
        default="secret.key",
        help="Path to key file (default: secret.key)",
    )
    parser.add_argument(
        "--generate-key",
        action="store_true",
        help="Generate a new key file and exit.",
    )

    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--encrypt-text", help="Encrypt a plain text string.")
    mode.add_argument("--decrypt-text", help="Decrypt an encrypted token string.")
    mode.add_argument("--encrypt-file", help="Path to file to encrypt.")
    mode.add_argument("--decrypt-file", help="Path to file to decrypt.")

    parser.add_argument(
        "--output",
        help="Output file path (required for file operations).",
    )

    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()

    key_path = Path(args.key_file)

    if args.generate_key:
        generate_key_file(key_path)
        return

    if not any(
        [args.encrypt_text, args.decrypt_text, args.encrypt_file, args.decrypt_file]
    ):
        parser.error(
            "No action provided. Use --generate-key, --encrypt-text, --decrypt-text, --encrypt-file, or --decrypt-file."
        )

    fernet = load_fernet(key_path)

    if args.encrypt_text:
        result = encrypt_text(fernet, args.encrypt_text)
        print(result)
        return

    if args.decrypt_text:
        result = decrypt_text(fernet, args.decrypt_text)
        print(result)
        return

    if args.encrypt_file:
        if not args.output:
            parser.error("--output is required with --encrypt-file.")
        encrypt_file(fernet, Path(args.encrypt_file), Path(args.output))
        return

    if args.decrypt_file:
        if not args.output:
            parser.error("--output is required with --decrypt-file.")
        decrypt_file(fernet, Path(args.decrypt_file), Path(args.output))
        return


if __name__ == "__main__":
    main()
