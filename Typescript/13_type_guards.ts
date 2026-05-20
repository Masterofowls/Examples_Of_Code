type Cat = {
  kind: 'cat';
  meow: () => void;
};

type Dog = {
  kind: 'dog';
  bark: () => void;
};

type Bird = {
  kind: 'bird';
  chirp: () => void;
};

type Animal = Cat | Dog | Bird;

const isCat = (animal: Animal): animal is Cat => animal.kind === 'cat';

const speak = (animal: Animal): void => {
  if (isCat(animal)) {
    animal.meow();
    return;
  }

  switch (animal.kind) {
    case 'dog':
      animal.bark();
      break;
    case 'bird':
      animal.chirp();
      break;
    default: {
      const neverAnimal: never = animal;
      console.log(neverAnimal);
    }
  }
};

const animals: Animal[] = [
  { kind: 'cat', meow: () => console.log('Meow') },
  { kind: 'dog', bark: () => console.log('Woof') },
  { kind: 'bird', chirp: () => console.log('Tweet') },
];

animals.forEach((animal) => speak(animal));
