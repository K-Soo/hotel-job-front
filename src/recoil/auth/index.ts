import { atom } from 'recoil';
import { ProviderType, RoleType, AccountStatusType, CompanyVerificationStatus, CertificationStatus } from '@/types';
export interface AuthAtom {
  provider?: ProviderType;
  role?: RoleType;
  accountStatus?: AccountStatusType;
  nickname?: string;
  companyVerificationStatus?: CompanyVerificationStatus | undefined;
  status: 'AUTHENTICATED' | 'AUTHENTICATION_FAILURE' | 'IDLE';
  certificationStatus: CertificationStatus | undefined;
}

export const authAtom = atom<AuthAtom>({
  key: 'authAtom',
  default: {
    role: undefined,
    provider: undefined,
    accountStatus: undefined,
    nickname: undefined,
    companyVerificationStatus: undefined,
    status: 'IDLE',
    certificationStatus: undefined,
  },
});
