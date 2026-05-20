const fs = require('node:fs');

const parseArgs = () => {
  const args = process.argv.slice(2);
  const parsed = {
    file: '.env',
    get: null,
    set: null,
    delete: null,
    list: false,
  };

  for (let i = 0; i < args.length; i += 1) {
    const key = args[i];
    const value = args[i + 1];

    if (key === '--file' && value) {
      parsed.file = value;
      i += 1;
    } else if (key === '--get' && value) {
      parsed.get = value;
      i += 1;
    } else if (key === '--set' && args[i + 1] && args[i + 2]) {
      parsed.set = [args[i + 1], args[i + 2]];
      i += 2;
    } else if (key === '--delete' && value) {
      parsed.delete = value;
      i += 1;
    } else if (key === '--list') {
      parsed.list = true;
    }
  }

  return parsed;
};

const loadEnvFile = (filePath) => {
  const vars = {};

  if (!fs.existsSync(filePath)) {
    return vars;
  }

  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  for (const raw of lines) {
    const line = raw.trim();

    if (!line || line.startsWith('#') || !line.includes('=')) {
      continue;
    }

    const [key, ...rest] = line.split('=');
    vars[key.trim()] = rest.join('=').trim();
  }

  return vars;
};

const saveEnvFile = (filePath, vars) => {
  const lines = Object.keys(vars)
    .sort()
    .map((key) => `${key}=${vars[key]}`);

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
  console.log(`Saved: ${filePath}`);
};

const main = () => {
  const args = parseArgs();
  const envVars = loadEnvFile(args.file);

  if (args.get) {
    const value = envVars[args.get];
    console.log(value ?? 'Key not found.');
    return;
  }

  if (args.set) {
    const [key, value] = args.set;
    envVars[key] = value;
    saveEnvFile(args.file, envVars);
    return;
  }

  if (args.delete) {
    if (!Object.hasOwn(envVars, args.delete)) {
      console.log('Key not found.');
      return;
    }

    delete envVars[args.delete];
    saveEnvFile(args.file, envVars);
    return;
  }

  if (args.list) {
    const entries = Object.entries(envVars);
    if (entries.length === 0) {
      console.log('No variables found.');
      return;
    }

    for (const [key, value] of entries) {
      console.log(`${key}=${value}`);
    }
    return;
  }

  console.log(
    'Usage: node Env_process.js [--file .env] [--get KEY | --set KEY VALUE | --delete KEY | --list]',
  );
};

main();
