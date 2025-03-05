import styled from 'styled-components';

interface SectionTitleProps {
  title: string;
  textAlignment?: 'center' | 'left' | 'right';
  margin?: string;
}

export default function SectionTitle({ title, textAlignment, margin }: SectionTitleProps) {
  return (
    <S.SectionTitle $textAlignment={textAlignment} $margin={margin}>
      <h1 className="title">{title}</h1>
    </S.SectionTitle>
  );
}

const S = {
  SectionTitle: styled.div<{ $textAlignment?: 'center' | 'left' | 'right'; $margin?: string }>`
    text-align: ${({ $textAlignment }) => $textAlignment || 'left'};
    margin: ${({ $margin }) => $margin || '0'};
    .title {
      font-size: 26px;
      margin-bottom: 30px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.black400};
    }
  `,
};
