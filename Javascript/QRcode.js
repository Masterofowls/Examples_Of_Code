// Requires: npm i qrcode
const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');
const QRCode = require('qrcode');

const generateQr = async (data, outputFile = 'qrcode.png') => {
  if (!data.trim()) {
    throw new Error('Input text cannot be empty.');
  }

  await QRCode.toFile(outputFile, data, {
    errorCorrectionLevel: 'M',
    margin: 4,
    width: 300,
  });

  console.log(`QR code saved as: ${outputFile}`);
};

const main = async () => {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    const text = (await rl.question('Enter text or URL for QR code: ')).trim();
    const output =
      (await rl.question('Output image name (default qrcode.png): ')).trim() ||
      'qrcode.png';

    await generateQr(text, output);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  } finally {
    rl.close();
  }
};

main();
