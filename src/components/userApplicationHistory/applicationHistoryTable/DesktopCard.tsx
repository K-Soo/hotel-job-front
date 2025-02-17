import { APPLICANT_REVIEW_STAGE_STATUS, APPLICATION_STATUS } from '@/constants/application';
import { ApplicationHistory } from '@/types';
import styled, { css } from 'styled-components';
import { dateFormat } from '@/utils';

interface DesktopCardProps {
  item: ApplicationHistory;
  handleClickApplicant: (applicant: ApplicationHistory) => void;
}

const PASS_STATUSES = ['INTERVIEW', 'INTERVIEW_PASS', 'ACCEPT'];

export default function DesktopCard({ item, handleClickApplicant }: DesktopCardProps) {
  const isPass = PASS_STATUSES.includes(item.reviewStageStatus);
  const isReject = item.reviewStageStatus === 'REJECT';

  return (
    <S.DesktopCard onClick={() => handleClickApplicant(item)}>
      <div className="row hotel">{item.recruitmentSnapshot.hotelName}</div>
      <div className="row position">
        <p className="position--text">{item.recruitmentSnapshot.title}</p>
      </div>
      <div className="row review-stage-status">
        <StyledReviewStageStatus $isPass={isPass} $isReject={isReject}>
          {APPLICANT_REVIEW_STAGE_STATUS[item.reviewStageStatus]}
        </StyledReviewStageStatus>
      </div>
      <div className="row application-status">
        <StyledApplicationStatus $isCancel={item.applicationStatus === 'CANCELED'}>
          {APPLICATION_STATUS[item.applicationStatus]}
        </StyledApplicationStatus>
      </div>
      <div className="row date">{dateFormat.date(item.applyAt, 'YY.MM.DD')}</div>
    </S.DesktopCard>
  );
}

const StyledReviewStageStatus = styled.span<{ $isPass: boolean; $isReject: boolean }>`
  ${(props) =>
    props.$isPass &&
    css`
      color: ${(props) => props.theme.colors.blue400};
    `};
  ${(props) =>
    props.$isReject &&
    css`
      color: ${(props) => props.theme.colors.red400};
    `};
`;

const StyledApplicationStatus = styled.span<{ $isCancel: boolean }>`
  font-weight: 300;
  ${(props) =>
    props.$isCancel &&
    css`
      color: ${(props) => props.theme.colors.gray600};
    `};
`;

const S = {
  DesktopCard: styled.div`
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.theme.colors.gray};
    }
    .row {
      font-size: 14px;
      text-align: center;
      flex-wrap: nowrap;
      white-space: nowrap;
      padding: 0 10px;
    }
    .hotel {
      flex: 0 0 120px;
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 120px;
    }
    .position {
      flex: 1;
      text-align: left;
      &--text {
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 260px;
      }
    }
    .review-stage-status {
      flex: 0 0 100px;
    }
    .application-status {
      flex: 0 0 80px;
    }
    .date {
      flex: 0 0 120px;
      font-size: 13px;
      color: ${(props) => props.theme.colors.gray600};
    }
  `,
};
