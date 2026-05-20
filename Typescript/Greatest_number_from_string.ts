const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const greatestNumberFromMixedString = (text) => {
  const numbers = (text.match(/\d+/g) || []).map(Number);

  if (numbers.length === 0) {
    throw new Error('No numbers found in string.');
  }

  return Math.max(...numbers);
};

const main = async () => {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    const text = (await rl.question('Enter mixed string: ')).trim();
    const result = greatestNumberFromMixedString(text);
    console.log('Greatest number:', result);
  } catch (error) {
    console.log('Error:', error.message);
  } finally {
    rl.close();
  }
};

main();
