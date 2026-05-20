const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const withRetry = async <T>(
  operation: () => Promise<T>,
  maxAttempts: number,
  baseDelayMs: number,
): Promise<T> => {
  let attempt = 0;
  let lastError: unknown;

  while (attempt < maxAttempts) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      attempt += 1;
      if (attempt >= maxAttempts) {
        break;
      }
      const delay = baseDelayMs * 2 ** (attempt - 1);
      await wait(delay);
    }
  }

  throw lastError;
};

let unstableCounter = 0;
const unstableTask = async (): Promise<string> => {
  unstableCounter += 1;
  if (unstableCounter < 3) {
    throw new Error(`Transient failure on attempt ${unstableCounter}`);
  }
  return `Success on attempt ${unstableCounter}`;
};

withRetry(unstableTask, 5, 100)
  .then((value) => console.log(value))
  .catch((error: unknown) => console.error('Failed:', error));
