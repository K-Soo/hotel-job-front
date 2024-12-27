import styled from 'styled-components';
import { EmployerAside } from '@/components/layout';
import { useRouter } from 'next/router';

interface EmployerMainProps {
  children: React.ReactNode;
}

const EXCLUDED_ASIDE_PATH = ['landing'] as const;

export function EmployerMain({ children }: EmployerMainProps) {
  const router = useRouter();

  const isExcludedAsidePath = EXCLUDED_ASIDE_PATH.some((path) => router.pathname.includes(path));

  return (
    <S.EmployerMain>
      {!isExcludedAsidePath && <EmployerAside />}
      {children}
    </S.EmployerMain>
  );
}

const S = {
  EmployerMain: styled.main`
    min-height: calc(100vh - 60px);
    display: flex;
    background-color: ${(props) => props.theme.colors.grayOpacity100};
    & > section {
      flex: 1;
      padding: 20px;
    }
  `,
};
