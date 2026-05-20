class BankAccount {
  private balance: number;

  constructor(
    public readonly owner: string,
    initialBalance: number,
  ) {
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error('Deposit amount must be greater than 0.');
    }
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error('Withdraw amount must be greater than 0.');
    }
    if (amount > this.balance) {
      throw new Error('Insufficient balance.');
    }
    this.balance -= amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount('Daniel', 100);
account.deposit(50);
account.withdraw(30);

console.log(`${account.owner} balance: ${account.getBalance().toFixed(2)}`);
