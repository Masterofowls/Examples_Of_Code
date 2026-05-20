const appName: string = 'ExamplesApp';
const maxUsers: number = 100;
const isLive: boolean = true;

const tags: string[] = ['typescript', 'examples'];
const tuplePoint: [number, number] = [10, 20];

enum UserRole {
  Admin = 'admin',
  Member = 'member',
  Guest = 'guest',
}

const activeRole: UserRole = UserRole.Member;

console.log({
  appName,
  maxUsers,
  isLive,
  tags,
  tuplePoint,
  activeRole,
});
