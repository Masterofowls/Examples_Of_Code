const letterFrequency = (input) => {
  const frequencies = {};

  for (const char of input) {
    if (frequencies[char]) {
      frequencies[char] += 1;
    } else {
      frequencies[char] = 1;
    }
  }

  return frequencies;
};

const freqs = letterFrequency('This is just a test string');
console.log(freqs);
