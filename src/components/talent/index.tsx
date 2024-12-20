import styled from 'styled-components';

interface TalentProps {
  children: React.ReactNode;
}

export default function Talent({ children }: TalentProps) {
  return <S.Talent>{children}</S.Talent>;
}

const S = {
  Talent: styled.section`
    display: flex;
    height: 100%;
  `,
};
