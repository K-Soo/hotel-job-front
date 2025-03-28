import styled from 'styled-components';

interface RecruitProps {
  children: React.ReactNode;
}

export default function Recruit({ children }: RecruitProps) {
  return <S.Recruit>{children}</S.Recruit>;
}

const S = {
  Recruit: styled.section`
    height: 100px;
    ${(props) => props.theme.media.laptop`
      padding: 15px;
    `};
    ${(props) => props.theme.media.mobile`
      background-color: ${props.theme.colors.gray50};
    `};
  `,
};
