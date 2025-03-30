import React from 'react';
import { useRouter } from 'next/router';
import path from '@/constants/path';
import useAuth from '@/hooks/useAuth';
import { RoleType } from '@/types';
import LoadingOverlay from '@/components/common/LoadingOverlay';

interface GuardComponentProps {
  allowedRoles: RoleType[] | undefined;
  children: React.ReactNode;
}

export default function GuardComponent({ allowedRoles, children }: GuardComponentProps) {
  const router = useRouter();
  const { isAuthFailure, isAuthIdle, isAuthenticated, authAtomState, role, isUnAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isUnAuthenticated) {
      alert('잘못된 접근입니다.');
      router.replace(path.SIGN_IN);
      return;
    }

    if (isAuthFailure) {
      alert('잘못된 접근입니다.');
      router.replace(path.SIGN_IN);
      return;
    }

    if (!allowedRoles) {
      alert('접근 권한이 없습니다.');
      router.replace(path.SIGN_IN);
      return;
    }

    if (role && !allowedRoles.includes(role)) {
      alert('접근 권한이 없습니다.');
      router.replace(path.HOME);
    }

    // 미 인증 기업정보 미 인증 시 기업정보 등록 페이지로 이동
    if (role === 'EMPLOYER' && authAtomState.companyVerificationStatus === 'NOT_REQUESTED') {
      router.replace(path.EMPLOYER_SETUP_COMPANY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowedRoles, role, authAtomState.companyVerificationStatus, isUnAuthenticated, isAuthFailure]);

  if (!allowedRoles) {
    return <LoadingOverlay />;
  }

  if (role && !allowedRoles.includes(role)) {
    return <LoadingOverlay />;
  }

  if (isAuthIdle || isUnAuthenticated) {
    return <LoadingOverlay />;
  }

  if (isAuthenticated) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return null;
}
