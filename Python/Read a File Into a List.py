with open("example.txt", "r") as file:
    lines = []
    for line in file.readlines():
        lines.append(line.strip("\n"))
    print(lines)
