const sumToMillion = () => {
  let sum = 0;
  for (let i = 0; i < 1_000_000; i += 1) {
    sum += i;
  }
  return sum;
};

const start = performance.now();
sumToMillion();
const end = performance.now();

console.log(
  `The time to sum numbers up to million took ${((end - start) / 1000).toFixed(6)} seconds`,
);
