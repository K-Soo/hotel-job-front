import styled from 'styled-components';
import UserAsideMenu from '@/components/common/user/UserAsideMenu';

interface UserApplicationHistoryProps {
  children: React.ReactNode;
}

export default function UserApplicationHistory({ children }: UserApplicationHistoryProps) {
  return (
    <S.UserApplicationHistory>
      <UserAsideMenu />
      {children}
    </S.UserApplicationHistory>
  );
}

const S = {
  UserApplicationHistory: styled.section`
    display: flex;
  `,
};
