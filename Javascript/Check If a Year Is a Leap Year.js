const isLeap = (year) =>
  year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

const year = 2020;

if (isLeap(year)) {
  console.log(`The year ${year} is a leap year`);
} else {
  console.log(`The year ${year} is not a leap year`);
}
