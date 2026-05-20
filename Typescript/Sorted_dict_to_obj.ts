const sortedDictToObject = (data) => {
  const sortedEntries = Object.entries(data).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  return Object.fromEntries(sortedEntries);
};

const main = () => {
  const userData = {
    age: 25,
    name: 'Daniel',
    country: 'USA',
    score: 99,
  };

  const obj = sortedDictToObject(userData);

  console.log('Object:', obj);
  console.log('Name:', obj.name);
  console.log('Age:', obj.age);
  console.log('Country:', obj.country);
  console.log('Score:', obj.score);
};

main();
