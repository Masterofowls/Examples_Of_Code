import json
import urllib.error
import urllib.request


def simple_get(url: str, timeout: int = 10) -> None:
    try:
        request = urllib.request.Request(
            url,
            method="GET",
            headers={
                "User-Agent": "SimplePythonHttpClient/1.0",
            },
        )

        with urllib.request.urlopen(request, timeout=timeout) as response:
            status = response.status
            body = response.read().decode("utf-8", errors="replace")
            content_type = response.headers.get("Content-Type", "")

            print(f"Status: {status}")
            print(f"Content-Type: {content_type}")
            print("Body:")

            if "application/json" in content_type:
                try:
                    parsed = json.loads(body)
                    print(json.dumps(parsed, indent=2, ensure_ascii=False))
                except json.JSONDecodeError:
                    print(body)
            else:
                print(body)

    except urllib.error.HTTPError as error:
        print(f"HTTP error: {error.code} - {error.reason}")
    except urllib.error.URLError as error:
        print(f"URL error: {error.reason}")
    except TimeoutError:
        print("Request timed out.")
    except Exception as error:
        print(f"Unexpected error: {error}")


def main() -> None:
    url = input("Enter URL: ").strip()
    if not url:
        print("URL cannot be empty.")
        return

    simple_get(url)


if __name__ == "__main__":
    main()
