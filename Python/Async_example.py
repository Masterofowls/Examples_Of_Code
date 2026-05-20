import asyncio
import time


async def fetch_data(task_name: str, delay: int) -> str:
    print(f"{task_name}: started (will take {delay}s)")
    await asyncio.sleep(delay)
    print(f"{task_name}: finished")
    return f"{task_name} result"


async def main() -> None:
    start = time.perf_counter()

    results = await asyncio.gather(
        fetch_data("Task A", 2),
        fetch_data("Task B", 1),
        fetch_data("Task C", 3),
    )

    end = time.perf_counter()

    print("\nResults:")
    for result in results:
        print(result)

    print(f"\nTotal time: {end - start:.2f} seconds")


if __name__ == "__main__":
    asyncio.run(main())
