from playwright.sync_api import sync_playwright


def main() -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        page.goto("https://example.com")
        print("Title:", page.title())

        page.screenshot(path="example.png", full_page=True)
        print("Screenshot saved as example.png")

        browser.close()


if __name__ == "__main__":
    main()
