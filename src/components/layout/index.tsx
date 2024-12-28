import styled from 'styled-components';
import Loading from '@/components/common/Loading';
import { useRecoilValue } from 'recoil';
import { loadingAtom } from '@/recoil/loading';
import { daumPostAtom } from '@/recoil/daumPost';
import { bottomSheetAtom } from '@/recoil/bottomSheet';
import AccountBottomSheet from '@/components/common/AccountBottomSheet';
import DaumPost from '@/components/common/DaumPost';
import Alert from '@/components/common/Alert';
import Confirm from '@/components/common/Confirm';
import Modal from '@/components/common/Modal';
import { alertWithConfirmSelector } from '@/recoil/alertWithConfirm';

export { Footer } from '@/components/layout/footer';
export { Main } from '@/components/layout/main';
export { EmployerMain } from '@/components/layout/main/EmployerMain';
export { Header } from '@/components/layout/header';
export { DesktopNavigation } from '@/components/layout/header/desktopNavigation';
export { MobileNavigation } from '@/components/layout/header/mobileNavigation';
export { EmployerHeader } from '@/components/layout/header/employerHeader';
export { EmployerAside } from '@/components/layout/aside/EmployerAside';

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
      {loadingAtomValue.isLoading && <Loading />}

      {daumPostAtomValue.isOpen && <DaumPost />}

      {bottomSheetAtomValue.isOpen && <AccountBottomSheet />}

      {alertWithConfirmSelectorValue.type === 'ALERT' && <Alert />}
      {alertWithConfirmSelectorValue.type === 'CONFIRM' && <Confirm />}

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
