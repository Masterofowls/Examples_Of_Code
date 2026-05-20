const data = { Alice: 23, Bob: 54, Charlie: 12 };
const ages = Object.values(data);
const maxAge = Math.max(...ages);

console.log(`The oldest person is ${maxAge} years old.`);
