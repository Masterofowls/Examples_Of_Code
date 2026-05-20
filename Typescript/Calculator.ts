const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => {
    if (b === 0) {
      throw new Error('Cannot divide by zero.');
    }
    return a / b;
  },
};

const main = async () => {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    const first = Number((await rl.question('First number: ')).trim());
    const op = (await rl.question('Operator (+, -, *, /): ')).trim();
    const second = Number((await rl.question('Second number: ')).trim());

    if (!Number.isFinite(first) || !Number.isFinite(second)) {
      console.log('Please enter valid numbers.');
      return;
    }

    if (!(op in operations)) {
      console.log('Invalid operator.');
      return;
    }

    const result = operations[op](first, second);
    console.log(`Result: ${result}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  } finally {
    rl.close();
  }
};

main();
