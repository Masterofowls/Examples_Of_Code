const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const countdown = async (totalSeconds) => {
  for (let seconds = totalSeconds; seconds >= 0; seconds -= 1) {
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;
    process.stdout.write(
      `\rTime left: ${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`,
    );
    await sleep(1000);
  }

  process.stdout.write('\nTime is up!\n');
};

const main = async () => {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    const raw = (await rl.question('Enter countdown time in seconds: ')).trim();
    const seconds = Number(raw);

    if (!Number.isInteger(seconds) || seconds < 0) {
      console.log('Please enter a non-negative whole number.');
      return;
    }

    await countdown(seconds);
  } finally {
    rl.close();
  }
};

main().catch((error) => {
  console.error('Unexpected error:', error);
});
