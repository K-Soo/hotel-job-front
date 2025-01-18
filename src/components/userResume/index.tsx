import styled from 'styled-components';
import UserTemplate from '@/components/common/user/UserTemplate';
import UserAsideMenu from '@/components/common/user/UserAsideMenu';
import { useRouter } from 'next/router';
import path from '@/constants/path';

interface UserResumeProps {
  children: React.ReactNode;
}

//가능동
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
