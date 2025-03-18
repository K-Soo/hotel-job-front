import { atom } from 'recoil';
import { Provider, RoleType, AccountStatus, CompanyVerificationStatus, CertificationStatus } from '@/types';
export interface AuthAtom {
  provider?: Provider;
  role?: RoleType;
  accountStatus?: AccountStatus;
  nickname?: string;
  certificationStatus?: CertificationStatus;
  companyVerificationStatus?: CompanyVerificationStatus; //사업자만 사용

  status: 'IDLE' | 'AUTHENTICATED_LOADING' | 'AUTHENTICATED' | 'AUTHENTICATION_FAILURE' | 'UNAUTHENTICATED';
}

export const authAtom = atom<AuthAtom>({
  key: 'authAtom',
  default: {
    role: undefined,
    provider: undefined,
    accountStatus: undefined,
    nickname: undefined,
    companyVerificationStatus: undefined,
    certificationStatus: undefined,

    status: 'IDLE',
  },
});
