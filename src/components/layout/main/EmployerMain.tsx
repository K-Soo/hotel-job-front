import styled from 'styled-components';
import { EmployerAside } from '@/components/layout';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import { Role } from '@/constants/auth';
interface EmployerMainProps {
  children: React.ReactNode;
}

const EXCLUDED_ASIDE_PATH = ['landing', 'setup', 'success', 'fail'] as const;

export function EmployerMain({ children }: EmployerMainProps) {
  const router = useRouter();
  const { role } = useAuth();

  const isExcludedAsidePath = EXCLUDED_ASIDE_PATH.some((path) => router.pathname.includes(path));

  return (
    <S.EmployerMain>
      {!isExcludedAsidePath && role === Role.EMPLOYER && <EmployerAside />}
      <div className="main-container">{children}</div>
    </S.EmployerMain>
  );
}

const S = {
  EmployerMain: styled.main`
    min-height: calc(100vh - 60px - 50px);
    display: flex;
    background-color: ${(props) => props.theme.colors.white};
    .main-container {
      border-left: 1px solid ${(props) => props.theme.colors.gray200};
      flex: 1;
      & > section {
        flex: 1;
        padding: 30px;
        max-width: 1280px;
        margin: 0 auto;
        height: 100%;
        /* overflow-y: auto; */
      }
    }
  `,
};
