import React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import path from '@/constants/path';
import { Internal } from '@/apis';
import useAuth from '@/hooks/useAuth';
import { RoleType } from '@/types';
import Loading from '@/components/common/Loading';

interface GuardComponentProps {
  allowedRoles: RoleType[] | undefined;
  children: React.ReactNode;
}

export default function GuardComponent({ allowedRoles, children }: GuardComponentProps) {
  const [showLoading, setShowLoading] = React.useState(false);
  const router = useRouter();
  const { isAuthFailure, isAuthIdle, isAuthenticated, authStatus, role } = useAuth();

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
  }, [allowedRoles, role]);

  if (isAuthIdle && showLoading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <React.Fragment>{children}</React.Fragment>;
  }
}
