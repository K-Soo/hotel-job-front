import styled from 'styled-components';
import Loading from '@/components/common/Loading';
import Portal from '@/components/common/Portal';
import { useRecoilValue } from 'recoil';
import { loadingAtom } from '@/recoil/loading';

export { Footer } from '@/components/layout/footer';
export { Main } from '@/components/layout/main';
export { Header } from '@/components/layout/header';
export { DesktopNavigation } from '@/components/layout/header/desktopNavigation';
export { MobileNavigation } from '@/components/layout/header/mobileNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const loadingAtomValue = useRecoilValue(loadingAtom);

  return (
    <S.Layout>
      {loadingAtomValue.isLoading && (
        <Portal>
          <Loading />
        </Portal>
      )}

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
