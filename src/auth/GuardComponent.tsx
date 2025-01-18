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
  const [showLoading, setShowLoading] = React.useState(false);
  const router = useRouter();
  const { isAuthFailure, isAuthIdle, isAuthenticated, authAtomState, role } = useAuth();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (isAuthFailure) {
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
      router.replace(path.SIGN_IN);
    }

    // 미 인증 기업정보 미 인증 시 기업정보 등록 페이지로 이동
    if (role === 'EMPLOYER' && authAtomState.companyVerificationStatus === 'NOT_REQUESTED') {
      router.replace(path.EMPLOYER_SETUP_COMPANY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowedRoles, role, authAtomState.companyVerificationStatus]);

  if (isAuthIdle && showLoading) {
    // if (true) {
    return <LoadingOverlay />;
  }

  if (isAuthenticated) {
    return <React.Fragment>{children}</React.Fragment>;
  }
}
