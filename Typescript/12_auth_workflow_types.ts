type AuthMethod = 'password' | 'google' | 'github';

type AuthUser = {
  id: string;
  email: string;
  isEmailVerified: boolean;
  mfaEnabled: boolean;
};

type AuthState =
  | { status: 'signed_out' }
  | { status: 'pending_verification'; user: AuthUser }
  | { status: 'pending_mfa'; user: AuthUser }
  | { status: 'authenticated'; user: AuthUser; accessToken: string };

const nextAuthState = (
  user: AuthUser,
  method: AuthMethod,
): AuthState => {
  if (!user.isEmailVerified && method === 'password') {
    return { status: 'pending_verification', user };
  }

  if (user.mfaEnabled) {
    return { status: 'pending_mfa', user };
  }

  return {
    status: 'authenticated',
    user,
    accessToken: 'demo-access-token',
  };
};

const describeAuthState = (state: AuthState): string => {
  switch (state.status) {
    case 'signed_out':
      return 'User is signed out.';
    case 'pending_verification':
      return `Verify email for ${state.user.email}.`;
    case 'pending_mfa':
      return `MFA required for ${state.user.email}.`;
    case 'authenticated':
      return `Welcome ${state.user.email}.`;
    default: {
      const neverState: never = state;
      return neverState;
    }
  }
};

const demoUser: AuthUser = {
  id: 'u1',
  email: 'alice@example.com',
  isEmailVerified: true,
  mfaEnabled: true,
};

const state = nextAuthState(demoUser, 'password');
console.log(describeAuthState(state));
