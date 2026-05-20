interface User {
  id: number;
  name: string;
  email?: string;
}

const formatUser = (user: User): string => {
  const email = user.email ?? 'no-email';
  return `${user.id}: ${user.name} <${email}>`;
};

const getDisplayNames = (users: User[]): string[] =>
  users.map((user) => user.name.toUpperCase());

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob' },
];

console.log(formatUser(users[0]));
console.log(getDisplayNames(users));
