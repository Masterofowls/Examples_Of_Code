class BankAccount {
  static bankName = 'Simple Bank';

  constructor(owner, balance = 0) {
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount) {
    if (amount <= 0) {
      throw new Error('Deposit amount must be greater than 0.');
    }
    this.balance += amount;
  }

  withdraw(amount) {
    if (amount <= 0) {
      throw new Error('Withdraw amount must be greater than 0.');
    }
    if (amount > this.balance) {
      throw new Error('Insufficient balance.');
    }
    this.balance -= amount;
  }

  getBalance() {
    return this.balance;
  }

  static fromString(data) {
    const [owner, balance] = data.split(',');
    return new BankAccount(owner.trim(), Number(balance.trim()));
  }

  static isValidAmount(amount) {
    return amount > 0;
  }

  toString() {
    return `Account(owner=${this.owner}, balance=${this.balance.toFixed(2)})`;
  }
}

const main = () => {
  const account = new BankAccount('Daniel', 100);
  account.deposit(50);
  account.withdraw(30);
  console.log(account.toString());

  const secondAccount = BankAccount.fromString('Alice,250');
  console.log(secondAccount.toString());

  console.log('Valid amount 10?', BankAccount.isValidAmount(10));
  console.log('Valid amount -5?', BankAccount.isValidAmount(-5));

  console.log('Current balance:', account.getBalance());
};

main();
