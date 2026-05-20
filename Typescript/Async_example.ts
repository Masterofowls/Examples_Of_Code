const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchData = async (taskName, delaySeconds) => {
  console.log(`${taskName}: started (will take ${delaySeconds}s)`);
  await sleep(delaySeconds * 1000);
  console.log(`${taskName}: finished`);
  return `${taskName} result`;
};

const main = async () => {
  const start = performance.now();

  const results = await Promise.all([
    fetchData('Task A', 2),
    fetchData('Task B', 1),
    fetchData('Task C', 3),
  ]);

  const end = performance.now();

  console.log('\nResults:');
  for (const result of results) {
    console.log(result);
  }

  console.log(`\nTotal time: ${((end - start) / 1000).toFixed(2)} seconds`);
};

main().catch((error) => {
  console.error('Unexpected error:', error);
});
