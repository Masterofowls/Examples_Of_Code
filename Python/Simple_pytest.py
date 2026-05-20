def add(a: int, b: int) -> int:
    return a + b


def divide(a: float, b: float) -> float:
    if b == 0:
        raise ValueError("Cannot divide by zero.")
    return a / b


def test_add() -> None:
    assert add(2, 3) == 5


def test_divide() -> None:
    assert divide(10, 2) == 5


def test_divide_by_zero() -> None:
    import pytest

    with pytest.raises(ValueError):
        divide(10, 0)
