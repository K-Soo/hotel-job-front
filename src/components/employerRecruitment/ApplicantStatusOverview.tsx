import { RecruitmentStatusKeys } from '@/types';
import styled from 'styled-components';

interface ApplicantStatusOverviewProps {
  status: RecruitmentStatusKeys;
  applicationCount: { totalCount: number; viewCount: number; notViewCount: number };
}

export default function ApplicantStatusOverview({ status, applicationCount }: ApplicantStatusOverviewProps) {
  if (status === 'DRAFT') {
    return <span>-</span>;
  }

  return (
    <S.ApplicantStatusOverview>
      <div className="column">
        <span className="column__title">지원자</span>
        <strong className="column__count">{applicationCount.totalCount}</strong>
      </div>
      <div className="column">
        <span className="column__title">열람</span>
        <strong className="column__count">{applicationCount.viewCount}</strong>
      </div>
      <div className="column">
        <span className="column__title">미열람</span>
        <strong className="column__count">{applicationCount.notViewCount}</strong>
      </div>
    </S.ApplicantStatusOverview>
  );
}

const S = {
  ApplicantStatusOverview: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.colors.gray300};
    background-color: ${(props) => props.theme.colors.white};
    .column {
      flex: 1;
      display: flex;
      flex-direction: column;
      font-size: 13px;
      &__title {
        color: ${(props) => props.theme.colors.gray700};
        font-size: 12px;
      }
      &__count {
        padding-top: 2px;
        font-weight: 500;
        color: ${(props) => props.theme.colors.black200};
      }
    }
  `,
};
