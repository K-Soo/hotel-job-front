import styled from 'styled-components';

interface ResumeSummarySectionPreviewProps {
  text?: string;
}

export default function ResumeSummarySectionPreview({ text }: ResumeSummarySectionPreviewProps) {
  return <S.ResumeSummarySectionPreview>{text}</S.ResumeSummarySectionPreview>;
}

const S = {
  ResumeSummarySectionPreview: styled.p`
    line-height: 1.5;
    font-size: 15px;
    color: ${({ theme }) => theme.colors.black500};
  `,
};
