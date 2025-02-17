import Button from '@/components/common/style/Button';
import { AnnouncementType, EmployerReviewStageStatusKey, RecruitmentDetailApplicantListItem } from '@/types';
import styled from 'styled-components';

interface StepBodyRowProps {
  fetchUpdateEmployerReviewStageStatus: (id: number, stage: EmployerReviewStageStatusKey) => Promise<void>;
  item: RecruitmentDetailApplicantListItem;
  handleClickNotifyOneApplicant: (resumeSnapshot: RecruitmentDetailApplicantListItem) => void;
  announcementRecipients: { id: number; announcement: AnnouncementType }[];
}

export default function StepBodyRow({
  item,
  fetchUpdateEmployerReviewStageStatus,
  handleClickNotifyOneApplicant,
  announcementRecipients,
}: StepBodyRowProps) {
  const isCancelApplicant = item.cancelAt !== null;

  if (announcementRecipients.length > 0) {
    // 불합격 포함될경우
    const isIncludesRejected = announcementRecipients.some((item) => item.announcement.announcementType === 'REJECT');

    // 합격 발표가 최종 합격일 경우
    const isIncludesAcceptWithFinalAccept = announcementRecipients.some(
      (item) => item.announcement.announcementType === 'ACCEPT' && item.announcement.reviewStage === 'ACCEPT',
    );

    if (isIncludesRejected) {
      return (
        <S.StepBodyRow>
          <Button
            label="불합격 발표 확인"
            variant="tertiary"
            width="120px"
            fontSize="14px"
            height="35px"
            style={{ color: '#333333' }}
            disabled={isCancelApplicant}
          />
        </S.StepBodyRow>
      );
    }

    if (isIncludesAcceptWithFinalAccept) {
      return (
        <S.StepBodyRow>
          <Button
            label="합격 발표 확인"
            variant="tertiary"
            width="120px"
            fontSize="14px"
            height="35px"
            style={{ color: '#333333' }}
            disabled={isCancelApplicant}
          />
        </S.StepBodyRow>
      );
    }
  }

  return (
    <S.StepBodyRow>
      {item.employerReviewStageStatus === 'DOCUMENT' && (
        <Button
          label="다음 전형 이동"
          variant="primary"
          width="120px"
          fontSize="14px"
          height="35px"
          onClick={() => fetchUpdateEmployerReviewStageStatus(item.id, 'INTERVIEW')}
          disabled={isCancelApplicant}
        />
      )}

      {item.employerReviewStageStatus === 'INTERVIEW' && (
        <>
          <Button
            label="다음 전형 이동"
            variant="primary"
            width="120px"
            fontSize="14px"
            height="35px"
            margin="0 0 10px 0"
            onClick={() => fetchUpdateEmployerReviewStageStatus(item.id, 'ACCEPT')}
            disabled={isCancelApplicant}
          />
        </>
      )}

      {item.employerReviewStageStatus === 'ACCEPT' && (
        <Button
          label="합격 발표"
          variant="primary"
          width="120px"
          fontSize="14px"
          height="35px"
          onClick={() => handleClickNotifyOneApplicant(item)}
          disabled={isCancelApplicant}
        />
      )}

      {item.employerReviewStageStatus === 'REJECT' && (
        <Button
          label="불합격 발표"
          variant="primary"
          width="120px"
          fontSize="14px"
          height="35px"
          onClick={() => handleClickNotifyOneApplicant(item)}
          disabled={isCancelApplicant}
        />
      )}
    </S.StepBodyRow>
  );
}

const S = {
  StepBodyRow: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-basis: 15%;
    height: 100%;
  `,
};
