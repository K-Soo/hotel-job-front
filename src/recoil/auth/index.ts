import { atom, selector } from 'recoil';
import { ProviderType, RoleType } from '@/types';
export interface AuthAtom {
  provider?: ProviderType;
  role?: RoleType;
  status: 'AUTHENTICATED' | 'AUTHENTICATION_FAILURE' | 'IDLE';
}

export const authAtom = atom<AuthAtom>({
  key: 'authAtom',
  default: {
    role: undefined,
    provider: undefined,
    status: 'IDLE',
  },
});
