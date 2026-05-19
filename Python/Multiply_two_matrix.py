def multiply_matrices(
    matrix_a: list[list[float]], matrix_b: list[list[float]]
) -> list[list[float]]:
    if not matrix_a or not matrix_b:
        raise ValueError("Matrices cannot be empty.")

    rows_a = len(matrix_a)
    cols_a = len(matrix_a[0])
    rows_b = len(matrix_b)
    cols_b = len(matrix_b[0])

    for row in matrix_a:
        if len(row) != cols_a:
            raise ValueError("Matrix A has inconsistent row sizes.")

    for row in matrix_b:
        if len(row) != cols_b:
            raise ValueError("Matrix B has inconsistent row sizes.")

    if cols_a != rows_b:
        raise ValueError(
            f"Cannot multiply: columns of A ({cols_a}) must equal rows of B ({rows_b})."
        )

    result = [[0.0 for _ in range(cols_b)] for _ in range(rows_a)]

    for i in range(rows_a):
        for j in range(cols_b):
            for k in range(cols_a):
                result[i][j] += matrix_a[i][k] * matrix_b[k][j]

    return result


def read_matrix(name: str) -> list[list[float]]:
    rows = int(input(f"Enter number of rows for {name}: ").strip())
    cols = int(input(f"Enter number of columns for {name}: ").strip())

    matrix: list[list[float]] = []
    print(f"Enter rows for {name} (space-separated numbers):")

    for r in range(rows):
        row_values = input(f"Row {r + 1}: ").strip().split()
        if len(row_values) != cols:
            raise ValueError(
                f"Expected {cols} values in row {r + 1}, got {len(row_values)}."
            )
        matrix.append([float(value) for value in row_values])

    return matrix


def print_matrix(matrix: list[list[float]]) -> None:
    for row in matrix:
        print(" ".join(f"{value:g}" for value in row))


def main() -> None:
    try:
        matrix_a = read_matrix("Matrix A")
        matrix_b = read_matrix("Matrix B")
        result = multiply_matrices(matrix_a, matrix_b)

        print("\nResult (A x B):")
        print_matrix(result)
    except ValueError as error:
        print(f"Error: {error}")


if __name__ == "__main__":
    main()
