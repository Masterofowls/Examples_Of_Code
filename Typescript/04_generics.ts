const firstItem = <T>(items: T[]): T | undefined => items[0];

const pair = <T, U>(left: T, right: U): [T, U] => [left, right];

class Box<T> {
  constructor(private readonly value: T) {}

  getValue(): T {
    return this.value;
  }
}

const firstNumber = firstItem([10, 20, 30]);
const firstWord = firstItem(['a', 'b', 'c']);
const mixedPair = pair('user', 42);
const boxed = new Box({ id: 7, label: 'boxed-object' });

console.log({ firstNumber, firstWord, mixedPair, value: boxed.getValue() });
