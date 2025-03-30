import { APPLICANT_REVIEW_STAGE_STATUS } from '@/constants/application';
import { ApplicationHistory } from '@/types';
import styled, { css } from 'styled-components';
import { dateFormat } from '@/utils';
import { motion } from 'framer-motion';

interface MobileCardProps {
  item: ApplicationHistory;
  handleClickApplicant: (applicant: ApplicationHistory) => void;
}

const PASS_STATUSES = ['INTERVIEW', 'INTERVIEW_PASS', 'ACCEPT'];

export default function MobileCard({ item, handleClickApplicant }: MobileCardProps) {
  const isPass = PASS_STATUSES.includes(item.reviewStageStatus);
  const isReject = item.reviewStageStatus === 'REJECT';

  return (
    <S.MobileCard
      onClick={() => handleClickApplicant(item)}
      whileTap={{
        backgroundColor: '#f9fafb',
      }}
    >
      <h6 className="hotel">{item.recruitmentSnapshot.hotelName}</h6>

      <p className="title">{item.recruitmentSnapshot.title}</p>

      <div className="status">
        <StyledReviewStageStatus $isPass={isPass} $isReject={isReject}>
          {APPLICANT_REVIEW_STAGE_STATUS[item.reviewStageStatus]}
        </StyledReviewStageStatus>
      </div>

      <div className="bottom">
        <p className="bottom__apply">
          <span>{dateFormat.date(item.applyAt, 'YY.MM.DD')}</span>
          <span>접수</span>
        </p>
        {item.applicationStatus === 'CANCELED' && (
          <p className="bottom__cancel">
            <span>{dateFormat.date(item.cancelAt, 'YY.MM.DD')}</span>
            <span>지원취소</span>
          </p>
        )}
      </div>
    </S.MobileCard>
  );
}
const StyledReviewStageStatus = styled.span<{ $isPass: boolean; $isReject: boolean }>`
  color: ${(props) => props.theme.colors.black400};
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

const S = {
  MobileCard: styled(motion.div)`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
    padding: 10px 0;
    .hotel {
      margin-bottom: 4px;
      font-size: 14px;
    }
    .title {
      font-size: 13px;
      color: ${(props) => props.theme.colors.gray700};
    }
    .status {
      margin: 10px 0;
      display: flex;
      font-size: 14px;
    }
    .bottom {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      font-size: 13px;
      color: ${(props) => props.theme.colors.gray600};
      &__date {
      }
      &__cancel {
        &::before {
          content: '';
          display: inline-block;
          width: 1px;
          height: 10px;
          background-color: ${(props) => props.theme.colors.gray600};
          margin: 0 10px;
        }
      }
    }
  `,
};
