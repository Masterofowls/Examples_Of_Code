type Primitive = string | number | boolean | null | undefined;

type ReadonlyDeep<T> = {
  readonly [K in keyof T]: T[K] extends Primitive
    ? T[K]
    : ReadonlyDeep<T[K]>;
};

type ApiResponse<T> = T extends { id: string }
  ? { ok: true; data: T }
  : { ok: false; error: 'missing-id' };

type User = {
  id: string;
  profile: {
    displayName: string;
    age: number;
  };
};

const user: ReadonlyDeep<User> = {
  id: 'u1',
  profile: {
    displayName: 'Alice',
    age: 30,
  },
};

const makeResponse = <T extends object>(value: T): ApiResponse<T> => {
  if ('id' in value && typeof value.id === 'string') {
    return { ok: true, data: value } as ApiResponse<T>;
  }

  return { ok: false, error: 'missing-id' } as ApiResponse<T>;
};

console.log(user.profile.displayName);
console.log(makeResponse(user));
console.log(makeResponse({ name: 'NoId' }));
