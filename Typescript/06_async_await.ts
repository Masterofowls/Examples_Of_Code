const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const fetchMockData = async (
  name: string,
  waitMs: number,
): Promise<string> => {
  await delay(waitMs);
  return `${name} done in ${waitMs}ms`;
};

const main = async (): Promise<void> => {
  const start = Date.now();

  const results = await Promise.all([
    fetchMockData('Task A', 300),
    fetchMockData('Task B', 500),
    fetchMockData('Task C', 200),
  ]);

  const elapsed = Date.now() - start;
  console.log(results);
  console.log(`Total elapsed: ${elapsed}ms`);
};

main().catch((error: unknown) => {
  console.error('Unexpected error:', error);
});
