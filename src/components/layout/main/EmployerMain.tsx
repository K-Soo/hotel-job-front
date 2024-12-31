import styled from 'styled-components';
import { EmployerAside } from '@/components/layout';
import { useRouter } from 'next/router';

interface EmployerMainProps {
  children: React.ReactNode;
}

const EXCLUDED_ASIDE_PATH = ['landing', 'checkout', 'setup'] as const;

export function EmployerMain({ children }: EmployerMainProps) {
  const router = useRouter();

  const isExcludedAsidePath = EXCLUDED_ASIDE_PATH.some((path) => router.pathname.includes(path));

  return (
    <S.EmployerMain>
      {!isExcludedAsidePath && <EmployerAside />}
      <div className="test">
        {children}
        <footer className="employer-footer">©2024 celestara</footer>
      </div>
    </S.EmployerMain>
  );
}

const S = {
  EmployerMain: styled.main`
    min-height: calc(100vh - 60px);
    display: flex;
    background-color: ${(props) => props.theme.colors.white};
    .test {
      flex: 1;
      display: flex;
      flex-direction: column;
      & > section {
        flex: 1;
        padding: 30px;
        overflow-y: auto;
      }
      .employer-footer {
        border-top: 1px solid ${(props) => props.theme.colors.gray200};
        height: 50px;
        display: flex;
        align-items: center;
        font-size: 11px;
        padding: 0 15px;
        color: ${(props) => props.theme.colors.gray500};
      }
    }
  `,
};
