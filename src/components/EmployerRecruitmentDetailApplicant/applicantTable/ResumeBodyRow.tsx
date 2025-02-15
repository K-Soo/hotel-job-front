import { EmployerReviewStageStatusKey } from '@/types';
import styled from 'styled-components';

interface ResumeBodyRowProps {
  id: number;
  employerReviewStageStatus: 'DOCUMENT' | 'INTERVIEW' | 'ACCEPT' | 'REJECT';
  fetchUpdateEmployerReviewStageStatus: (id: number, stage: EmployerReviewStageStatusKey) => Promise<void>;
}

export default function ResumeBodyRow({ id, employerReviewStageStatus, fetchUpdateEmployerReviewStageStatus }: ResumeBodyRowProps) {
  return (
    <S.ResumeBodyRow>
      {employerReviewStageStatus === 'DOCUMENT' && (
        <StyledRejectButton onClick={() => fetchUpdateEmployerReviewStageStatus(id, 'REJECT')} margin="0">
          불합격 처리
        </StyledRejectButton>
      )}

      {employerReviewStageStatus === 'INTERVIEW' && (
        <>
          <StyledRollbackButton onClick={() => fetchUpdateEmployerReviewStageStatus(id, 'DOCUMENT')}>전형이동 복구</StyledRollbackButton>
          <StyledRejectButton onClick={() => fetchUpdateEmployerReviewStageStatus(id, 'REJECT')}>불합격 처리</StyledRejectButton>
        </>
      )}

      {employerReviewStageStatus === 'ACCEPT' && (
        <StyledRollbackButton onClick={() => fetchUpdateEmployerReviewStageStatus(id, 'DOCUMENT')}>전형이동 복구</StyledRollbackButton>
      )}

      {employerReviewStageStatus === 'REJECT' && (
        <StyledRollbackButton onClick={() => fetchUpdateEmployerReviewStageStatus(id, 'DOCUMENT')}>전형이동 복구</StyledRollbackButton>
      )}
    </S.ResumeBodyRow>
  );
}

const StyledRollbackButton = styled.button`
  color: ${(props) => props.theme.colors.gray800};
  font-size: 13px;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.black200};
  }
`;

const StyledRejectButton = styled.button<{ margin?: string }>`
  color: ${(props) => props.theme.colors.gray800};
  font-size: 13px;
  cursor: pointer;
  text-decoration: underline;
  margin: ${(props) => props.margin || '10px 0 0 0'};
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.black200};
  }
`;

const S = {
  ResumeBodyRow: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 0 1 100px;
    height: 100%;
  `,
};
