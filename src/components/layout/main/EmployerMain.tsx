import styled from 'styled-components';
import Layout, { EmployerAside } from '@/components/layout';

interface EmployerMainProps {
  children: React.ReactNode;
}

export function EmployerMain({ children }: EmployerMainProps) {
  return (
    <S.EmployerMain>
      {/* <EmployerAside /> */}
      {children}
    </S.EmployerMain>
  );
}

const S = {
  EmployerMain: styled.main`
    min-height: calc(100vh - 60px);
    display: flex;
    & > section {
      flex: 1;
      padding: 20px;
    }
  `,
};
