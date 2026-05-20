const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const isLeapYear = (year) =>
  year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

const parseDate = (text) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text.trim());
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

const dateOnly = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const formatLongDate = (date) =>
  `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${String(
    date.getDate(),
  ).padStart(2, '0')}, ${date.getFullYear()}`;

const main = async () => {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    const raw = await rl.question('Enter your birthday (YYYY-MM-DD): ');
    const bday = parseDate(raw);

    if (!bday) {
      console.log('Invalid date format. Use YYYY-MM-DD.');
      return;
    }

    const today = dateOnly(new Date());
    const birthday = dateOnly(bday);

    if (birthday > today) {
      console.log('Birthday is in the future.');
      return;
    }

    let age = today.getFullYear() - birthday.getFullYear();
    const hasHadBirthday =
      today.getMonth() > birthday.getMonth() ||
      (today.getMonth() === birthday.getMonth() &&
        today.getDate() >= birthday.getDate());
    if (!hasHadBirthday) {
      age -= 1;
    }

    const buildBirthday = (year) => {
      if (birthday.getMonth() === 1 && birthday.getDate() === 29 && !isLeapYear(year)) {
        return new Date(year, 2, 1);
      }
      return new Date(year, birthday.getMonth(), birthday.getDate());
    };

    let nextBirthday = buildBirthday(today.getFullYear());
    if (nextBirthday < today) {
      nextBirthday = buildBirthday(today.getFullYear() + 1);
    }

    const dayMs = 24 * 60 * 60 * 1000;
    const daysLived = Math.floor((today - birthday) / dayMs);
    const daysUntil = Math.floor((nextBirthday - today) / dayMs);

    console.log(`You were born on a ${dayNames[birthday.getDay()]}.`);
    console.log(`Age: ${age} years`);
    console.log(`Days lived: ${daysLived.toLocaleString()}`);

    if (daysUntil === 0) {
      console.log('Happy birthday - it is today!');
    } else {
      console.log(
        `Days until next birthday: ${daysUntil} (${formatLongDate(nextBirthday)})`,
      );
    }
  } finally {
    rl.close();
  }
};

main().catch((error) => {
  console.error('Unexpected error:', error);
});
