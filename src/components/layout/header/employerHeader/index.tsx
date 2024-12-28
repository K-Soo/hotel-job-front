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
      {/* TODO: 일반 페이지와 분기 처리 */}
      <Logo size="small" margin="0 30px 0 0" />
      {!isAuthenticated && (
        <Button
          label="로그인"
          variant="tertiary"
          height="40px"
          onClick={() => router.push(`${path.SIGN_IN}?type=company`)}
          fontSize="15px"
          width="80px"
        />
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
    background-color: ${(props) => props.theme.colors.white};
    display: flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
  `,
};
