const fs = require('node:fs');
const path = require('node:path');

const parseArgs = () => {
  const args = process.argv.slice(2);
  const parsed = { input: null, output: null };

  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--input' && args[i + 1]) {
      parsed.input = args[i + 1];
      i += 1;
    } else if (args[i] === '--output' && args[i + 1]) {
      parsed.output = args[i + 1];
      i += 1;
    }
  }

  return parsed;
};

const readText = (filePath) => fs.readFileSync(filePath, 'utf8');

const writeText = (filePath, content) => {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Wrote: ${filePath}`);
};

const csvToJson = (inputPath, outputPath) => {
  const lines = readText(inputPath)
    .split(/\r?\n/)
    .filter((line) => line.trim() !== '');

  const headers = lines[0].split(',').map((header) => header.trim());
  const rows = lines.slice(1).map((line) => {
    const values = line.split(',').map((value) => value.trim());
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] ?? '';
    });
    return row;
  });

  writeText(outputPath, JSON.stringify(rows, null, 2));
  console.log(`Converted CSV -> JSON: ${outputPath}`);
};

const jsonToCsv = (inputPath, outputPath) => {
  const data = JSON.parse(readText(inputPath));
  if (!Array.isArray(data)) {
    throw new Error('JSON must be a list of objects for json->csv conversion.');
  }

  if (data.length === 0) {
    writeText(outputPath, '');
    console.log(`Converted JSON -> CSV (empty): ${outputPath}`);
    return;
  }

  const fieldNames = [...new Set(data.flatMap((item) => Object.keys(item)))].sort();
  const rows = [fieldNames.join(',')];

  for (const item of data) {
    const row = fieldNames.map((field) => String(item[field] ?? ''));
    rows.push(row.join(','));
  }

  writeText(outputPath, `${rows.join('\n')}\n`);
  console.log(`Converted JSON -> CSV: ${outputPath}`);
};

const txtToJson = (inputPath, outputPath) => {
  const lines = readText(inputPath)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  writeText(outputPath, JSON.stringify(lines, null, 2));
  console.log(`Converted TXT -> JSON: ${outputPath}`);
};

const jsonToTxt = (inputPath, outputPath) => {
  const data = JSON.parse(readText(inputPath));
  const content = Array.isArray(data)
    ? data.map((item) => String(item)).join('\n')
    : JSON.stringify(data, null, 2);

  writeText(outputPath, content);
  console.log(`Converted JSON -> TXT: ${outputPath}`);
};

const convert = (inputPath, outputPath) => {
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}`);
  }

  const src = path.extname(inputPath).toLowerCase();
  const dst = path.extname(outputPath).toLowerCase();

  if (src === '.csv' && dst === '.json') {
    csvToJson(inputPath, outputPath);
    return;
  }

  if (src === '.json' && dst === '.csv') {
    jsonToCsv(inputPath, outputPath);
    return;
  }

  if (src === '.txt' && dst === '.json') {
    txtToJson(inputPath, outputPath);
    return;
  }

  if (src === '.json' && dst === '.txt') {
    jsonToTxt(inputPath, outputPath);
    return;
  }

  throw new Error(`Unsupported conversion: ${src} -> ${dst}`);
};

const main = () => {
  const args = parseArgs();

  if (!args.input || !args.output) {
    console.log('Usage: node File_Converter.js --input <file> --output <file>');
    return;
  }

  try {
    convert(args.input, args.output);
  } catch (error) {
    console.log(`Conversion failed: ${error.message}`);
  }
};

main();
