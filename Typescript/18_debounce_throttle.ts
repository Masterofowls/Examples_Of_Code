const debounce = <TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  delayMs: number,
): ((...args: TArgs) => void) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: TArgs) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delayMs);
  };
};

const throttle = <TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  intervalMs: number,
): ((...args: TArgs) => void) => {
  let last = 0;

  return (...args: TArgs) => {
    const now = Date.now();
    if (now - last >= intervalMs) {
      last = now;
      fn(...args);
    }
  };
};

const log = (value: string): void => console.log(value, Date.now());

const debouncedLog = debounce(log, 200);
const throttledLog = throttle(log, 200);

debouncedLog('debounced-1');
debouncedLog('debounced-2');

throttledLog('throttle-1');
setTimeout(() => throttledLog('throttle-2'), 100);
setTimeout(() => throttledLog('throttle-3'), 250);
