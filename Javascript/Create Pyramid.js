const pyramid = (rows) => {
  for (let i = 0; i < rows; i += 1) {
    const spaces = ' '.repeat(rows - i - 1);
    const stars = '*'.repeat(2 * i + 1);
    console.log(spaces + stars);
  }
};

pyramid(12);
