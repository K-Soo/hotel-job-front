import styled from 'styled-components';

interface UserTemplateProps {
  children: React.ReactNode;
}

export default function UserTemplate({ children }: UserTemplateProps) {
  return <S.UserTemplate>{children}</S.UserTemplate>;
}

const S = {
  UserTemplate: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
  `,
};
