const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const simpleGet = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'SimpleJavaScriptHttpClient/1.0',
      },
    });

    const contentType = response.headers.get('content-type') || '';
    const body = await response.text();

    console.log(`Status: ${response.status}`);
    console.log(`Content-Type: ${contentType}`);
    console.log('Body:');

    if (contentType.includes('application/json')) {
      try {
        console.log(JSON.stringify(JSON.parse(body), null, 2));
      } catch {
        console.log(body);
      }
    } else {
      console.log(body);
    }
  } catch (error) {
    console.log(`Request failed: ${error.message}`);
  }
};

const main = async () => {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    const url = (await rl.question('Enter URL: ')).trim();

    if (!url) {
      console.log('URL cannot be empty.');
      return;
    }

    await simpleGet(url);
  } finally {
    rl.close();
  }
};

main();
