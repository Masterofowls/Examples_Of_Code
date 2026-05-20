const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const parseCsvLine = (line, delimiter) => line.split(delimiter).map((cell) => cell.trim());

const importCsv = (filePath, delimiter = ',') => {
  const resolved = path.resolve(filePath);

  if (!fs.existsSync(resolved)) {
    throw new Error(`File not found: ${resolved}`);
  }

  if (path.extname(resolved).toLowerCase() !== '.csv') {
    throw new Error('Please provide a .csv file');
  }

  const content = fs.readFileSync(resolved, 'utf8').replace(/^\uFEFF/, '');
  const lines = content.split(/\r?\n/).filter((line) => line.trim() !== '');

  if (lines.length === 0) {
    throw new Error('CSV has no header row');
  }

  const headers = parseCsvLine(lines[0], delimiter);
  if (headers.length === 0) {
    throw new Error('CSV has no header row');
  }

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line, delimiter);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] ?? '';
    });
    return row;
  });
};

const main = async () => {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    const filePath = (await rl.question('Enter CSV file path: ')).trim();
    const delimiter = (await rl.question('Delimiter (press Enter for comma): ')).trim() || ',';

    const rows = importCsv(filePath, delimiter);
    console.log(`Imported ${rows.length} rows.`);

    if (rows.length > 0) {
      console.log('Columns:', Object.keys(rows[0]).join(', '));
      console.log('Preview:');
      rows.slice(0, 5).forEach((row, index) => {
        console.log(`${index + 1}.`, row);
      });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  } finally {
    rl.close();
  }
};

main();
