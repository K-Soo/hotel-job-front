import styled from 'styled-components';
import Loading from '@/components/common/Loading';
import Portal from '@/components/common/Portal';
import { useRecoilValue } from 'recoil';
import { loadingAtom } from '@/recoil/loading';
import { daumPostAtom } from '@/recoil/daumPost';
import { bottomSheetAtom } from '@/recoil/bottomSheet';

export { Footer } from '@/components/layout/footer';
export { Main } from '@/components/layout/main';
export { Header } from '@/components/layout/header';
export { DesktopNavigation } from '@/components/layout/header/desktopNavigation';
export { MobileNavigation } from '@/components/layout/header/mobileNavigation';
import AccountBottomSheet from '@/components/common/AccountBottomSheet';
import DaumPost from '@/components/common/DaumPost';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const loadingAtomValue = useRecoilValue(loadingAtom);
  const daumPostAtomValue = useRecoilValue(daumPostAtom);
  const bottomSheetAtomValue = useRecoilValue(bottomSheetAtom);

  return (
    <S.Layout>
      {loadingAtomValue.isLoading && (
        <Portal>
          <Loading />
        </Portal>
      )}

      {daumPostAtomValue.isOpen && (
        <Portal>
          <DaumPost />
        </Portal>
      )}

      {bottomSheetAtomValue.isOpen && <AccountBottomSheet />}

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
