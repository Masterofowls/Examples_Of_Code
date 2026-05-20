const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const toSortable = (value) => {
  const trimmed = value.trim();
  if (trimmed === '') {
    return trimmed;
  }

  if (!Number.isNaN(Number(trimmed))) {
    return Number(trimmed);
  }

  return trimmed.toLowerCase();
};

const getHeaders = async (rl) => {
  while (true) {
    const raw = (await rl.question('Enter column names (comma-separated): ')).trim();
    const headers = raw
      .split(',')
      .map((header) => header.trim())
      .filter(Boolean);

    if (headers.length > 0) {
      return headers;
    }

    console.log('Please enter at least one column.');
  }
};

const getPositiveInt = async (rl, prompt) => {
  while (true) {
    const value = Number((await rl.question(prompt)).trim());
    if (Number.isInteger(value) && value > 0) {
      return value;
    }
    console.log('Enter a valid number greater than 0.');
  }
};

const getRows = async (rl, headers, rowCount) => {
  const rows = [];
  console.log('\nEnter row values:');

  for (let i = 0; i < rowCount; i += 1) {
    console.log(`Row ${i + 1}:`);
    const row = {};

    for (const header of headers) {
      row[header] = (await rl.question(`  ${header}: `)).trim();
    }

    rows.push(row);
  }

  return rows;
};

const printTable = (headers, rows) => {
  const widths = Object.fromEntries(headers.map((header) => [header, header.length]));

  for (const row of rows) {
    for (const header of headers) {
      widths[header] = Math.max(widths[header], String(row[header] ?? '').length);
    }
  }

  const headerLine = headers.map((header) => header.padEnd(widths[header])).join(' | ');
  const separator = headers.map((header) => '-'.repeat(widths[header])).join('-+-');

  console.log(`\n${headerLine}`);
  console.log(separator);

  for (const row of rows) {
    const line = headers
      .map((header) => String(row[header] ?? '').padEnd(widths[header]))
      .join(' | ');
    console.log(line);
  }
};

const chooseSortColumn = async (rl, headers) => {
  while (true) {
    const sortBy = (await rl.question(`\nSort by column ${JSON.stringify(headers)}: `)).trim();
    if (headers.includes(sortBy)) {
      return sortBy;
    }
    console.log('Invalid column name.');
  }
};

const chooseSortOrder = async (rl) => {
  while (true) {
    const order = (await rl.question('Sort order (asc/desc): ')).trim().toLowerCase();
    if (order === 'asc' || order === 'desc') {
      return order === 'desc';
    }
    console.log('Please type asc or desc.');
  }
};

const sortRows = (rows, sortBy, descending) =>
  [...rows].sort((a, b) => {
    const left = toSortable(a[sortBy] ?? '');
    const right = toSortable(b[sortBy] ?? '');

    if (left < right) {
      return descending ? 1 : -1;
    }
    if (left > right) {
      return descending ? -1 : 1;
    }
    return 0;
  });

const main = async () => {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    const headers = await getHeaders(rl);
    const rowCount = await getPositiveInt(rl, 'How many rows? ');
    const rows = await getRows(rl, headers, rowCount);

    while (true) {
      const sortBy = await chooseSortColumn(rl, headers);
      const descending = await chooseSortOrder(rl);

      const sortedRows = sortRows(rows, sortBy, descending);
      printTable(headers, sortedRows);

      const again = (
        await rl.question('\nSort again with another column/order? (y/n): ')
      )
        .trim()
        .toLowerCase();

      if (again !== 'y') {
        console.log('Done.');
        break;
      }
    }
  } finally {
    rl.close();
  }
};

main();
