const fs = require('node:fs');

const content = fs.readFileSync('example.txt', 'utf8');
const lines = content.split(/\r?\n/).map((line) => line.replace(/\n$/, ''));

console.log(lines);
