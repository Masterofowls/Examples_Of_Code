const crypto = require('node:crypto');
const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const digits = '0123456789';
const symbols = '!@#$%^&*()-_=+[]{};:,.?';
const allChars = lowercase + uppercase + digits + symbols;

const randomChar = (pool) => pool[crypto.randomInt(0, pool.length)];

const shuffle = (items) => {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = crypto.randomInt(0, i + 1);
    [items[i], items[j]] = [items[j], items[i]];
  }
};

const generatePassword = (length = 16) => {
  if (length < 8) {
    throw new Error('Password length should be at least 8.');
  }

  const required = [
    randomChar(lowercase),
    randomChar(uppercase),
    randomChar(digits),
    randomChar(symbols),
  ];

  const remaining = Array.from(
    { length: length - required.length },
    () => randomChar(allChars),
  );

  const passwordChars = [...required, ...remaining];
  shuffle(passwordChars);
  return passwordChars.join('');
};

const generateUniquePasswords = (count, length) => {
  const passwords = new Set();
  while (passwords.size < count) {
    passwords.add(generatePassword(length));
  }
  return [...passwords];
};

const main = async () => {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    const count = Number((await rl.question('How many passwords? ')).trim() || '1');
    const length = Number((await rl.question('Password length? ')).trim() || '16');

    if (!Number.isInteger(count) || count < 1) {
      console.log('Count must be at least 1.');
      return;
    }

    const passwords = generateUniquePasswords(count, length);

    console.log('\nGenerated unique passwords:');
    passwords.forEach((password, index) => {
      console.log(`${index + 1}. ${password}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  } finally {
    rl.close();
  }
};

main();
