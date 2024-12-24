import styled from 'styled-components';

interface UserResumeProps {
  children: React.ReactNode;
}

export default function UserResume({ children }: UserResumeProps) {
  return <S.UserResume>{children}</S.UserResume>;
}

const S = {
  UserResume: styled.section``,
};
