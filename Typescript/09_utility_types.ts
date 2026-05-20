type User = {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
};

type UserPreview = Pick<User, 'id' | 'name'>;
type UserPatch = Partial<User>;
type PublicUser = Omit<User, 'email'>;
type UserFlags = Record<'emailVerified' | 'mfaEnabled', boolean>;

const preview: UserPreview = { id: 1, name: 'Alice' };
const patch: UserPatch = { isActive: false };
const publicUser: PublicUser = { id: 1, name: 'Alice', isActive: true };
const flags: UserFlags = { emailVerified: true, mfaEnabled: false };

console.log({ preview, patch, publicUser, flags });
