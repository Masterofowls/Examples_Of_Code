const fs = require('node:fs');
const path = require('node:path');

const [, , query, targetDir = '.'] = process.argv;

if (!query) {
  console.log('Usage: node Command_line_search.js <query> [directory]');
  process.exit(1);
}

const visit = (dir, results) => {
  for (const name of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, name);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      visit(fullPath, results);
      continue;
    }

    try {
      const text = fs.readFileSync(fullPath, 'utf8');
      if (text.toLowerCase().includes(query.toLowerCase())) {
        results.push(fullPath);
      }
    } catch {
      // Ignore binary or unreadable files.
    }
  }
};

const results = [];
visit(path.resolve(targetDir), results);

if (results.length === 0) {
  console.log('No matches found.');
} else {
  console.log('Matches:');
  results.forEach((result) => console.log(result));
}
