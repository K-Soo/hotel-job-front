import styled from 'styled-components';
import UserAsideMenu from '@/components/common/user/UserAsideMenu';

interface UserResumeHistoryProps {
  children: React.ReactNode;
}

export default function UserResumeHistory({ children }: UserResumeHistoryProps) {
  return (
    <S.UserResumeHistory>
      <UserAsideMenu />
      {children}
    </S.UserResumeHistory>
  );
}

const S = {
  UserResumeHistory: styled.div`
    display: flex;
  `,
};
