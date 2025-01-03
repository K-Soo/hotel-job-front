import { authAtom } from '@/recoil/auth';
import { useRecoilState } from 'recoil';

export default function useAuth() {
  const [authAtomState, setAuthAtomState] = useRecoilState(authAtom);
  console.log('authAtomState: ', authAtomState);

  const isAuthenticated = authAtomState.status === 'AUTHENTICATED';
  const isAuthIdle = authAtomState.status === 'IDLE';
  const isAuthFailure = authAtomState.status === 'AUTHENTICATION_FAILURE';

  return {
    isAuthenticated,
    isAuthIdle,
    isAuthFailure,

    role: authAtomState.role,
    authAtomState,
    setAuthAtomState,
    authStatus: authAtomState.status,
  };
}
