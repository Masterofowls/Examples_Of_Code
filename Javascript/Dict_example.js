const main = () => {
  const user = {
    name: 'Daniel',
    age: 25,
    country: 'USA',
  };

  console.log('Original:', user);

  console.log('get("name"):', user.name);
  console.log('get("email", "not found"):', user.email ?? 'not found');

  console.log('keys():', Object.keys(user));
  console.log('values():', Object.values(user));
  console.log('items():', Object.entries(user));

  Object.assign(user, { age: 26, email: 'daniel@example.com' });
  console.log('after update():', user);

  if (!Object.hasOwn(user, 'city')) {
    user.city = 'New York';
  }
  if (!Object.hasOwn(user, 'name')) {
    user.name = 'Other Name';
  }
  console.log('after setdefault():', user);

  const removedEmail = user.email;
  delete user.email;
  console.log('popped email:', removedEmail);
  console.log('after pop("email"):', user);

  const keys = Object.keys(user);
  const lastKey = keys[keys.length - 1];
  const lastValue = user[lastKey];
  delete user[lastKey];
  console.log('popitem():', [lastKey, lastValue]);
  console.log('after popitem():', user);

  const userCopy = { ...user };
  console.log('copy():', userCopy);

  for (const key of Object.keys(userCopy)) {
    delete userCopy[key];
  }
  console.log('after clear() on copy:', userCopy);
  console.log('original still:', user);

  const defaultScores = Object.fromEntries(
    ['math', 'science', 'english'].map((subject) => [subject, 0]),
  );
  console.log('fromkeys():', defaultScores);
};

main();
