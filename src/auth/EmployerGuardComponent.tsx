import React from 'react';
import { useRouter } from 'next/router';
import path from '@/constants/path';
import useAuth from '@/hooks/useAuth';
import { RoleType } from '@/types';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import { alertWithConfirmAtom } from '@/recoil/alertWithConfirm';
import { useSetRecoilState } from 'recoil';

interface EmployerGuardComponentProps {
  allowedRoles: RoleType[] | undefined;
  children: React.ReactNode;
}

export default function EmployerGuardComponent({ allowedRoles, children }: EmployerGuardComponentProps) {
  const [showLoading, setShowLoading] = React.useState(true);
  const router = useRouter();
  const { isAuthFailure, isAuthIdle, isAuthenticated, authStatus, role } = useAuth();
  const setAlertWithConfirm = useSetRecoilState(alertWithConfirmAtom);

  React.useEffect(() => {
    // 미 인증 기업정보 미 인증 시 기업정보 등록 페이지로 이동
    if (role === 'EMPLOYER') {
      setAlertWithConfirm((prev) => ({
        ...prev,
        confirmLabel: '확인',
        type: 'ALERT',
        title: 'TITLE_1',
        subTitle: 'DESC_1',
        onClickConfirm: () => {
          router.replace(path.EMPLOYER_SETUP_COMPANY);
        },
      }));
      setShowLoading(false);
    }
  }, [router.pathname]);

  if (showLoading) {
    return <LoadingOverlay />;
  }

  if (!showLoading) {
    return <>{children}</>;
  }

  return null;
}
