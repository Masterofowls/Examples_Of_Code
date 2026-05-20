const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const loadJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const saveJson = (filePath, data) => {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`Saved: ${filePath}`);
};

const getNestedValue = (data, keyPath) => {
  let current = data;
  for (const key of keyPath.split('.')) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      throw new Error(`Path not found: ${keyPath}`);
    }
  }
  return current;
};

const main = async () => {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    const fileInput = (await rl.question('Enter JSON file path: ')).trim();
    if (!fileInput) {
      console.log('File path is required.');
      return;
    }

    const filePath = path.resolve(fileInput);
    if (!fs.existsSync(filePath)) {
      console.log('File not found.');
      return;
    }

    let data;
    try {
      data = loadJson(filePath);
    } catch (error) {
      console.log(`Invalid JSON: ${error.message}`);
      return;
    }

    console.log('\nPretty JSON:');
    console.log(JSON.stringify(data, null, 2));

    const keyPath = (
      await rl.question(
        '\nEnter key path to read (example: user.name), or press Enter to skip: ',
      )
    ).trim();

    if (keyPath) {
      try {
        const value = getNestedValue(data, keyPath);
        console.log(`Value at "${keyPath}":`, value);
      } catch (error) {
        console.log(error.message);
      }
    }

    const saveChoice = (
      await rl.question('\nSave pretty JSON to new file? (y/n): ')
    )
      .trim()
      .toLowerCase();

    if (saveChoice === 'y') {
      const outputPath = path.join(
        path.dirname(filePath),
        `${path.parse(filePath).name}_pretty.json`,
      );
      saveJson(outputPath, data);
    }
  } finally {
    rl.close();
  }
};

main();
