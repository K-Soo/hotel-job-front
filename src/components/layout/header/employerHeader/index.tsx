import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import useAuth from '@/hooks/useAuth';
import path from '@/constants/path';
import { useRouter } from 'next/router';
import Logo from '@/components/common/Logo';

interface EmployerHeaderProps {}

export function EmployerHeader({}: EmployerHeaderProps) {
  const router = useRouter();

  const { isAuthenticated } = useAuth();

  return (
    <S.EmployerHeader>
      <Logo size="small" margin="0 30px 0 0" />
      {!isAuthenticated && (
        <Button label="로그인" variant="tertiary" height="40px" onClick={() => router.push(path.SIGN_IN)} fontSize="15px" width="80px" />
      )}
    </S.EmployerHeader>
  );
}

const S = {
  EmployerHeader: styled.div`
    position: sticky;
    top: -0;
    height: 60px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
    display: flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
  `,
};
