import styled from 'styled-components';

interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <S.SectionTitle>
      <h1 className="title">{title}</h1>
    </S.SectionTitle>
  );
}

const S = {
  SectionTitle: styled.div`
    .title {
      font-size: 26px;
      margin-bottom: 30px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.black400};
    }
  `,
};
