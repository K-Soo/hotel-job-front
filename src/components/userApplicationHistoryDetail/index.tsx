import styled from 'styled-components';
import UserAsideMenu from '@/components/common/user/UserAsideMenu';

interface UserApplicationHistoryDetailProps {
  children: React.ReactNode;
}

export default function UserApplicationHistoryDetail({ children }: UserApplicationHistoryDetailProps) {
  return (
    <S.UserApplicationHistoryDetail>
      <UserAsideMenu />
      {children}
    </S.UserApplicationHistoryDetail>
  );
}

const S = {
  UserApplicationHistoryDetail: styled.div`
    display: flex;
  `,
};
