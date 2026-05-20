const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const greetUser = (username) => `Hello, ${username}! Welcome.`;

const main = async () => {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    const username = (await rl.question('Enter your username: ')).trim();

    if (!username) {
      console.log('Username cannot be empty.');
      return;
    }

    console.log(greetUser(username));
  } finally {
    rl.close();
  }
};

main();
