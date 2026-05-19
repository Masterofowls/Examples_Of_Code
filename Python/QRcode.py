import qrcode


def generate_qr(data: str, output_file: str = "qrcode.png") -> None:
    if not data.strip():
        raise ValueError("Input text cannot be empty.")

    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    image = qr.make_image(fill_color="black", back_color="white")
    image.save(output_file)
    print(f"QR code saved as: {output_file}")


def main() -> None:
    text = input("Enter text or URL for QR code: ").strip()
    output = input("Output image name (default qrcode.png): ").strip()

    if not output:
        output = "qrcode.png"

    try:
        generate_qr(text, output)
    except ValueError as error:
        print(f"Error: {error}")


if __name__ == "__main__":
    main()
