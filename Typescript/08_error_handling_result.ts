type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

const safeDivide = (a: number, b: number): Result<number, string> => {
  if (b === 0) {
    return { ok: false, error: 'Cannot divide by zero.' };
  }

  return { ok: true, value: a / b };
};

const printResult = (result: Result<number, string>): void => {
  if (result.ok) {
    console.log(`Value: ${result.value}`);
  } else {
    console.log(`Error: ${result.error}`);
  }
};

printResult(safeDivide(10, 2));
printResult(safeDivide(10, 0));
