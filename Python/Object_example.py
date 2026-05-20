class BankAccount:
    bank_name = "Simple Bank"  # class attribute

    def __init__(self, owner: str, balance: float = 0.0) -> None:
        self.owner = owner
        self.balance = balance

    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("Deposit amount must be greater than 0.")
        self.balance += amount

    def withdraw(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("Withdraw amount must be greater than 0.")
        if amount > self.balance:
            raise ValueError("Insufficient balance.")
        self.balance -= amount

    def get_balance(self) -> float:
        return self.balance

    @classmethod
    def from_string(cls, data: str) -> "BankAccount":
        # Expected format: "owner,balance"
        owner, balance = data.split(",")
        return cls(owner.strip(), float(balance.strip()))

    @staticmethod
    def is_valid_amount(amount: float) -> bool:
        return amount > 0

    def __str__(self) -> str:
        return f"Account(owner={self.owner}, balance={self.balance:.2f})"


def main() -> None:
    # __init__ + instance methods
    account = BankAccount("Daniel", 100.0)
    account.deposit(50.0)
    account.withdraw(30.0)
    print(account)  # __str__

    # class method
    second_account = BankAccount.from_string("Alice,250")
    print(second_account)

    # static method
    print("Valid amount 10?", BankAccount.is_valid_amount(10))
    print("Valid amount -5?", BankAccount.is_valid_amount(-5))

    # regular getter method
    print("Current balance:", account.get_balance())


if __name__ == "__main__":
    main()
