import { atom, selector } from 'recoil';
import { ProviderType, RoleType, AccountStatusType } from '@/types';
export interface AuthAtom {
  provider?: ProviderType;
  role?: RoleType;
  accountStatus?: AccountStatusType;
  nickname?: string;
  status: 'AUTHENTICATED' | 'AUTHENTICATION_FAILURE' | 'IDLE';
}

export const authAtom = atom<AuthAtom>({
  key: 'authAtom',
  default: {
    role: undefined,
    provider: undefined,
    accountStatus: undefined,
    nickname: undefined,
    status: 'IDLE',
  },
});
