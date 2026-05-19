# Python/Data_scrapper.py
from __future__ import annotations

import argparse
import csv
import json
import time
from dataclasses import asdict, dataclass
from typing import List
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup


@dataclass
class Quote:
    text: str
    author: str
    tags: List[str]


def fetch_page(url: str, timeout: int) -> str:
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/124.0.0.0 Safari/537.36"
        ),
    }

    response = requests.get(url, headers=headers, timeout=timeout)
    response.raise_for_status()
    return response.text


def parse_quotes(html: str) -> List[Quote]:
    soup = BeautifulSoup(html, "html.parser")
    quote_nodes = soup.select("div.quote")
    quotes: List[Quote] = []

    for node in quote_nodes:
        text_node = node.select_one("span.text")
        author_node = node.select_one("small.author")
        tag_nodes = node.select("div.tags a.tag")

        if text_node is None or author_node is None:
            continue

        quote = Quote(
            text=text_node.get_text(strip=True),
            author=author_node.get_text(strip=True),
            tags=[tag.get_text(strip=True) for tag in tag_nodes],
        )
        quotes.append(quote)

    return quotes


def find_next_page(html: str, current_url: str) -> str | None:
    soup = BeautifulSoup(html, "html.parser")
    next_link = soup.select_one("li.next a")
    if next_link is None:
        return None

    href = next_link.get("href")
    if not href:
        return None

    return urljoin(current_url, href)


def save_csv(quotes: List[Quote], output_path: str) -> None:
    with open(output_path, "w", encoding="utf-8", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["text", "author", "tags"])

        for quote in quotes:
            writer.writerow([quote.text, quote.author, ",".join(quote.tags)])


def save_json(quotes: List[Quote], output_path: str) -> None:
    payload = [asdict(quote) for quote in quotes]
    with open(output_path, "w", encoding="utf-8") as file:
        json.dump(payload, file, ensure_ascii=False, indent=2)


def scrape_quotes(
    start_url: str, max_pages: int, timeout: int, delay: float
) -> List[Quote]:
    all_quotes: List[Quote] = []
    current_url = start_url
    page = 1

    while current_url and page <= max_pages:
        print(f"Scraping page {page}: {current_url}")
        html = fetch_page(current_url, timeout=timeout)
        quotes = parse_quotes(html)
        all_quotes.extend(quotes)

        next_url = find_next_page(html, current_url)
        current_url = next_url
        page += 1

        if current_url:
            time.sleep(delay)

    return all_quotes


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Simple data scraper for quotes.toscrape.com"
    )
    parser.add_argument(
        "--url",
        default="https://quotes.toscrape.com/",
        help="Start URL",
    )
    parser.add_argument(
        "--pages",
        type=int,
        default=3,
        help="Maximum number of pages to scrape",
    )
    parser.add_argument(
        "--timeout",
        type=int,
        default=15,
        help="Request timeout in seconds",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=1.0,
        help="Delay between page requests (seconds)",
    )
    parser.add_argument(
        "--csv",
        default="quotes.csv",
        help="CSV output file",
    )
    parser.add_argument(
        "--json",
        default="quotes.json",
        help="JSON output file",
    )
    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()

    try:
        quotes = scrape_quotes(
            start_url=args.url,
            max_pages=args.pages,
            timeout=args.timeout,
            delay=args.delay,
        )
    except requests.RequestException as error:
        print(f"Failed to scrape data: {error}")
        return

    if not quotes:
        print("No data found.")
        return

    save_csv(quotes, args.csv)
    save_json(quotes, args.json)

    print(f"Scraped {len(quotes)} quotes.")
    print(f"CSV saved to: {args.csv}")
    print(f"JSON saved to: {args.json}")


if __name__ == "__main__":
    main()
