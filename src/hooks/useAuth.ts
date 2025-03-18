import { authAtom } from '@/recoil/auth';
import { useRecoilState } from 'recoil';

export default function useAuth() {
  const [authAtomState, setAuthAtomState] = useRecoilState(authAtom);

  const isAuthIdle = authAtomState.status === 'IDLE';

  const isAuthenticated = authAtomState.status === 'AUTHENTICATED';
  const isUnAuthenticated = authAtomState.status === 'UNAUTHENTICATED';

  const isAuthFailure = authAtomState.status === 'AUTHENTICATION_FAILURE';
  const isAuthLoading = authAtomState.status === 'AUTHENTICATED_LOADING';

  return {
    isAuthenticated,
    isAuthIdle,
    isAuthFailure,
    isAuthLoading,
    isUnAuthenticated,

    role: authAtomState.role,
    authAtomState,
    setAuthAtomState,
    authStatus: authAtomState.status,
  };
}
