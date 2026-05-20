const fs = require('node:fs');
const { URL } = require('node:url');

// Requires: npm i axios cheerio
const axios = require('axios');
const cheerio = require('cheerio');

const parseArgs = () => {
  const args = process.argv.slice(2);
  const parsed = {
    url: 'https://quotes.toscrape.com/',
    pages: 3,
    timeout: 15000,
    delay: 1000,
    csv: 'quotes.csv',
    json: 'quotes.json',
  };

  for (let i = 0; i < args.length; i += 1) {
    const key = args[i];
    const value = args[i + 1];

    if (key === '--url' && value) {
      parsed.url = value;
      i += 1;
    } else if (key === '--pages' && value) {
      parsed.pages = Number(value);
      i += 1;
    } else if (key === '--timeout' && value) {
      parsed.timeout = Number(value);
      i += 1;
    } else if (key === '--delay' && value) {
      parsed.delay = Number(value) * 1000;
      i += 1;
    } else if (key === '--csv' && value) {
      parsed.csv = value;
      i += 1;
    } else if (key === '--json' && value) {
      parsed.json = value;
      i += 1;
    }
  }

  return parsed;
};

const fetchPage = async (url, timeout) => {
  const response = await axios.get(url, {
    timeout,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36',
    },
  });

  return response.data;
};

const parseQuotes = (html) => {
  const $ = cheerio.load(html);
  const quotes = [];

  $('div.quote').each((_, element) => {
    const text = $(element).find('span.text').text().trim();
    const author = $(element).find('small.author').text().trim();
    const tags = $(element)
      .find('div.tags a.tag')
      .map((__, tag) => $(tag).text().trim())
      .get();

    if (text && author) {
      quotes.push({ text, author, tags });
    }
  });

  return quotes;
};

const findNextPage = (html, currentUrl) => {
  const $ = cheerio.load(html);
  const href = $('li.next a').attr('href');

  if (!href) {
    return null;
  }

  return new URL(href, currentUrl).toString();
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const scrapeQuotes = async (startUrl, maxPages, timeout, delayMs) => {
  const allQuotes = [];
  let currentUrl = startUrl;
  let page = 1;

  while (currentUrl && page <= maxPages) {
    console.log(`Scraping page ${page}: ${currentUrl}`);
    const html = await fetchPage(currentUrl, timeout);
    allQuotes.push(...parseQuotes(html));

    currentUrl = findNextPage(html, currentUrl);
    page += 1;

    if (currentUrl) {
      await sleep(delayMs);
    }
  }

  return allQuotes;
};

const saveCsv = (quotes, outputPath) => {
  const rows = ['text,author,tags'];
  for (const quote of quotes) {
    const escapedText = `"${quote.text.replaceAll('"', '""')}"`;
    const escapedAuthor = `"${quote.author.replaceAll('"', '""')}"`;
    const escapedTags = `"${quote.tags.join(',').replaceAll('"', '""')}"`;
    rows.push([escapedText, escapedAuthor, escapedTags].join(','));
  }

  fs.writeFileSync(outputPath, `${rows.join('\n')}\n`, 'utf8');
};

const saveJson = (quotes, outputPath) => {
  fs.writeFileSync(outputPath, JSON.stringify(quotes, null, 2), 'utf8');
};

const main = async () => {
  const args = parseArgs();

  try {
    const quotes = await scrapeQuotes(
      args.url,
      args.pages,
      args.timeout,
      args.delay,
    );

    if (quotes.length === 0) {
      console.log('No data found.');
      return;
    }

    saveCsv(quotes, args.csv);
    saveJson(quotes, args.json);

    console.log(`Scraped ${quotes.length} quotes.`);
    console.log(`CSV saved to: ${args.csv}`);
    console.log(`JSON saved to: ${args.json}`);
  } catch (error) {
    console.log(`Failed to scrape data: ${error.message}`);
  }
};

main();
