import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { loadingAtom } from '@/recoil/loading';
import { daumPostAtom } from '@/recoil/daumPost';
import { bottomSheetAtom } from '@/recoil/bottomSheet';
import Modal from '@/components/common/Modal';
import { alertWithConfirmSelector } from '@/recoil/alertWithConfirm';
import dynamic from 'next/dynamic';

export { Footer } from '@/components/layout/footer';
export { Main } from '@/components/layout/main';
export { EmployerMain } from '@/components/layout/main/EmployerMain';
export { Header } from '@/components/layout/header';
export { DesktopNavigation } from '@/components/layout/header/desktopNavigation';
export { MobileNavigation } from '@/components/layout/header/mobileNavigation';
export { EmployerHeader } from '@/components/layout/header/employerHeader';
export { EmployerAside } from '@/components/layout/aside/EmployerAside';
export { EmployerFooter } from '@/components/layout/footer/EmployerFooter';

const DynamicNoSSRLoading = dynamic(() => import('@/components/common/Loading'), { ssr: false });
const DynamicNoSSRDaumPost = dynamic(() => import('@/components/common/DaumPost'), { ssr: false });
const DynamicNoSSRAccountBottomSheet = dynamic(() => import('@/components/common/AccountBottomSheet'), { ssr: false });
const DynamicNoSSRAlert = dynamic(() => import('@/components/common/Alert'), { ssr: false });
const DynamicNoSSRConfirm = dynamic(() => import('@/components/common/Confirm'), { ssr: false });

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const loadingAtomValue = useRecoilValue(loadingAtom);
  const daumPostAtomValue = useRecoilValue(daumPostAtom);
  const bottomSheetAtomValue = useRecoilValue(bottomSheetAtom);
  const alertWithConfirmSelectorValue = useRecoilValue(alertWithConfirmSelector);

  return (
    <S.Layout>
      {loadingAtomValue.isLoading && <DynamicNoSSRLoading />}

      {bottomSheetAtomValue.isOpen && <DynamicNoSSRAccountBottomSheet />}

      {alertWithConfirmSelectorValue.type === 'ALERT' && <DynamicNoSSRAlert />}
      {alertWithConfirmSelectorValue.type === 'CONFIRM' && <DynamicNoSSRConfirm />}

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
