const main = () => {
  const text = '  Hello Python World  ';
  const csvText = 'apple,banana,grape';
  const mixed = 'pyTHon123';

  console.log('Original:', JSON.stringify(text));
  console.log('trim():', text.trim());
  console.log('toLowerCase():', text.toLowerCase());
  console.log('toUpperCase():', text.toUpperCase());
  console.log(
    'title():',
    text
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase()),
  );
  console.log(
    'replace("World", "Developers"):',
    text.replace('World', 'Developers'),
  );
  console.log('indexOf("Python"):', text.indexOf('Python'));
  console.log('startsWith("  Hello"):', text.startsWith('  Hello'));
  console.log('endsWith("  "):', text.endsWith('  '));
  console.log(
    'count("o"):',
    [...text].filter((char) => char === 'o').length,
  );
  console.log();

  const words = csvText.split(',');
  console.log('split(","):', words);
  console.log('join with " | " :', words.join(' | '));
  console.log();

  console.log('isalpha() on "Hello":', /^[A-Za-z]+$/.test('Hello'));
  console.log('isdigit() on "12345":', /^\d+$/.test('12345'));
  console.log('isalnum() on mixed:', /^[A-Za-z0-9]+$/.test(mixed));
  console.log();

  const name = 'Daniel';
  const age = 25;
  console.log(`template string example: Name = ${name}, Age = ${age}`);
};

main();
