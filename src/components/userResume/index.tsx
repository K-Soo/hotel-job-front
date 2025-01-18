import styled from 'styled-components';
import UserAsideMenu from '@/components/common/user/UserAsideMenu';

interface UserResumeProps {
  children: React.ReactNode;
}

export default function UserResume({ children }: UserResumeProps) {
  return (
    <S.UserResume>
      <UserAsideMenu />
      {children}
    </S.UserResume>
  );
}

const S = {
  UserResume: styled.section`
    display: flex;
  `,
};
