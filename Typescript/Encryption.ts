const crypto = require('node:crypto');
const fs = require('node:fs');

const parseArgs = () => {
  const args = process.argv.slice(2);
  const parsed = {
    keyFile: 'secret.key',
    generateKey: false,
    encryptText: null,
    decryptText: null,
    encryptFile: null,
    decryptFile: null,
    output: null,
  };

  for (let i = 0; i < args.length; i += 1) {
    const key = args[i];
    const value = args[i + 1];

    if (key === '--key-file' && value) {
      parsed.keyFile = value;
      i += 1;
    } else if (key === '--generate-key') {
      parsed.generateKey = true;
    } else if (key === '--encrypt-text' && value) {
      parsed.encryptText = value;
      i += 1;
    } else if (key === '--decrypt-text' && value) {
      parsed.decryptText = value;
      i += 1;
    } else if (key === '--encrypt-file' && value) {
      parsed.encryptFile = value;
      i += 1;
    } else if (key === '--decrypt-file' && value) {
      parsed.decryptFile = value;
      i += 1;
    } else if (key === '--output' && value) {
      parsed.output = value;
      i += 1;
    }
  }

  return parsed;
};

const generateKeyFile = (keyPath) => {
  const key = crypto.randomBytes(32);
  fs.writeFileSync(keyPath, key.toString('base64'), 'utf8');
  console.log(`Key generated: ${keyPath}`);
};

const loadKey = (keyPath) => {
  if (!fs.existsSync(keyPath)) {
    throw new Error(
      `Key file not found: ${keyPath}. Generate one with --generate-key.`,
    );
  }

  const raw = fs.readFileSync(keyPath, 'utf8').trim();
  return Buffer.from(raw, 'base64');
};

const encryptBuffer = (key, data) => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]);
};

const decryptBuffer = (key, payload) => {
  if (payload.length < 28) {
    throw new Error('Invalid payload.');
  }

  const iv = payload.subarray(0, 12);
  const tag = payload.subarray(12, 28);
  const encrypted = payload.subarray(28);

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);

  return Buffer.concat([decipher.update(encrypted), decipher.final()]);
};

const main = () => {
  const args = parseArgs();

  if (args.generateKey) {
    generateKeyFile(args.keyFile);
    return;
  }

  const actions = [
    args.encryptText,
    args.decryptText,
    args.encryptFile,
    args.decryptFile,
  ].filter(Boolean);

  if (actions.length !== 1) {
    console.log(
      'Use exactly one action: --generate-key, --encrypt-text, --decrypt-text, --encrypt-file, or --decrypt-file.',
    );
    return;
  }

  try {
    const key = loadKey(args.keyFile);

    if (args.encryptText) {
      const encrypted = encryptBuffer(key, Buffer.from(args.encryptText, 'utf8'));
      console.log(encrypted.toString('base64'));
      return;
    }

    if (args.decryptText) {
      const decrypted = decryptBuffer(key, Buffer.from(args.decryptText, 'base64'));
      console.log(decrypted.toString('utf8'));
      return;
    }

    if (args.encryptFile) {
      if (!args.output) {
        throw new Error('--output is required with --encrypt-file.');
      }
      const data = fs.readFileSync(args.encryptFile);
      fs.writeFileSync(args.output, encryptBuffer(key, data));
      console.log(`Encrypted file written: ${args.output}`);
      return;
    }

    if (args.decryptFile) {
      if (!args.output) {
        throw new Error('--output is required with --decrypt-file.');
      }
      const data = fs.readFileSync(args.decryptFile);
      fs.writeFileSync(args.output, decryptBuffer(key, data));
      console.log(`Decrypted file written: ${args.output}`);
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

main();
