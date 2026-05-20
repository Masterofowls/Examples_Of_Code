import time


# Example function that takes some time
def sum_to_million():
    sum = 0
    for i in range(1_000_000):
        sum += i


# Let's see how long summing numbers up to one million takes in Python:
start = time.time()
sum_to_million()
end = time.time()

# Not too long...
print(f"The time to sum numbers up to million took {end - start} seconds")
