import React from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loadingAtom } from '@/recoil/loading';
import { daumPostAtom } from '@/recoil/daumPost';
import { bottomSheetAtom } from '@/recoil/bottomSheet';
import { hamburgerNavigationAtom } from '@/recoil/hamburgerNavigation';
import { alertWithConfirmSelector, alertWithConfirmAtom } from '@/recoil/alertWithConfirm';
import { certificationModalAtom } from '@/recoil/certification';
import { toastAtom } from '@/recoil/toast';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';

export { Footer } from '@/components/layout/footer';
export { Main } from '@/components/layout/main';
export { EmployerMain } from '@/components/layout/main/EmployerMain';
export { Header } from '@/components/layout/header';
export { DesktopNavigation } from '@/components/layout/header/desktopNavigation';
export { MobileNavigation } from '@/components/layout/header/mobileNavigation';
export { EmployerHeader } from '@/components/layout/header/employerHeader';
export { EmployerAside } from '@/components/layout/aside/EmployerAside';
export { EmployerFooter } from '@/components/layout/footer/EmployerFooter';

const DynamicNoSSRStyledToaster = dynamic(() => import('@/components/common/StyledToaster'), { ssr: false });
const DynamicNoSSRLoadingOverlay = dynamic(() => import('@/components/common/LoadingOverlay'), { ssr: false });
const DynamicNoSSRAccountBottomSheet = dynamic(() => import('@/components/common/AccountBottomSheet'), { ssr: false });
const DynamicNoSSRAlert = dynamic(() => import('@/components/common/Alert'), { ssr: false });
const DynamicNoSSRConfirm = dynamic(() => import('@/components/common/Confirm'), { ssr: false });
const DynamicNoSSRToast = dynamic(() => import('@/components/common/Toast'), { ssr: false });
const DynamicNoSSRHamburgerNavigation = dynamic(() => import('@/components/layout/HamburgerNavigation'), { ssr: false });
const DynamicNoSSRDaumPost = dynamic(() => import('@/components/common/DaumPost'), { ssr: false });
const DynamicNoSSRCertificationModal = dynamic(() => import('@/components/common/CertificationModal'), { ssr: false });

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const loadingAtomValue = useRecoilValue(loadingAtom);
  const daumPostAtomValue = useRecoilValue(daumPostAtom);
  const bottomSheetAtomValue = useRecoilValue(bottomSheetAtom);
  const toastAtomValue = useRecoilValue(toastAtom);
  const alertWithConfirmSelectorValue = useRecoilValue(alertWithConfirmSelector);
  const hamburgerNavigationAtomValue = useRecoilValue(hamburgerNavigationAtom);
  const certificationModalAtomValue = useRecoilValue(certificationModalAtom);
  const setAlertWithConfirmSelector = useSetRecoilState(alertWithConfirmAtom);

  // React.useEffect(() => {
  //   setAlertWithConfirmSelector((prev) => ({
  //     ...prev,
  //     type: 'CONFIRM',
  //     confirmLabel: '확인',
  //     cancelLabel: '취소',
  //     title: 'TITLE_4',
  //     subTitle: 'DESC_4',
  //   }));
  // }, []);

  const handleCLick = () => {
    toast.info(`바빠: 바빠요`, {
      action: {
        label: 'Visit',
        onClick: () => {},
      },
    });
  };
  return (
    <S.Layout>
      <DynamicNoSSRStyledToaster />

      <button onClick={handleCLick}>토소</button>

      {loadingAtomValue.isLoading && <DynamicNoSSRLoadingOverlay />}
      {bottomSheetAtomValue.isOpen && <DynamicNoSSRAccountBottomSheet />}
      {certificationModalAtomValue.isOpen && <DynamicNoSSRCertificationModal />}

      <AnimatePresence>{hamburgerNavigationAtomValue.isOpen && <DynamicNoSSRHamburgerNavigation />}</AnimatePresence>

      {alertWithConfirmSelectorValue.type === 'ALERT' && <DynamicNoSSRAlert />}
      {alertWithConfirmSelectorValue.type === 'CONFIRM' && <DynamicNoSSRConfirm />}
      {toastAtomValue.length !== 0 && <DynamicNoSSRToast />}
      {children}
    </S.Layout>
  );
}

const S = {
  Layout: styled.div`
    min-height: 100vh;
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
};
