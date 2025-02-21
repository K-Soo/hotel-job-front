import { ResumeDetail, ResumeDetailForm } from '@/types';
import styled from 'styled-components';

interface SummaryProps {
  resumePreviewData: ResumeDetail | ResumeDetailForm;
}

export default function Summary({ resumePreviewData }: SummaryProps) {
  return (
    <S.Summary>
      <h6 className="title">간단소개</h6>
      <p>{resumePreviewData.summary}</p>
    </S.Summary>
  );
}

const S = {
  Summary: styled.div`
    color: ${({ theme }) => theme.colors.black500};
    line-height: 1.5;
    font-size: 15px;
    margin-bottom: 80px;
    .title {
      margin-bottom: 5px;
      font-size: 18px;
      font-weight: 500;
    }
  `,
};
