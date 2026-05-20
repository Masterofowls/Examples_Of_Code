const isPrime = (number) => {
  if (number > 1) {
    for (let i = 2; i <= Math.floor(number / 2); i += 1) {
      if (number % i === 0) {
        console.log(`${number} is not a prime number.`);
        return;
      }
    }

    console.log(`${number} is a prime number.`);
  } else {
    console.log(`${number} is not a prime number.`);
  }
};

isPrime(11);
isPrime(7);
isPrime(16);
