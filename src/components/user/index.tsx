import styled from 'styled-components';
import UserAsideMenu from '@/components/common/user/UserAsideMenu';

interface UserProps {
  children: React.ReactNode;
}

export default function User({ children }: UserProps) {
  return (
    <S.User>
      <UserAsideMenu />
      {children}
    </S.User>
  );
}

const S = {
  User: styled.section`
    display: flex;
  `,
};
