import { APPLICANT_REVIEW_STAGE_STATUS, APPLICATION_STATUS } from '@/constants/application';
import { ApplicationHistory } from '@/types';
import styled from 'styled-components';
import { dateFormat } from '@/utils';
import { motion } from 'framer-motion';

interface MobileCardProps {
  item: ApplicationHistory;
  handleClickApplicant: (applicant: ApplicationHistory) => void;
}

export default function MobileCard({ item, handleClickApplicant }: MobileCardProps) {
  return (
    <S.MobileCard
      onClick={() => handleClickApplicant(item)}
      whileTap={{
        backgroundColor: '#f9fafb',
      }}
    >
      <h6 className="hotel">{item.recruitmentSnapshot.hotelName}</h6>
      <p className="title">{item.recruitmentSnapshot.title}</p>
      <div className="status">{APPLICANT_REVIEW_STAGE_STATUS[item.reviewStageStatus]}</div>
      <div className="bottom">
        <div>{APPLICATION_STATUS[item.applicationStatus]}</div>
        <p className="bottom__date">지원일: {dateFormat.date(item.applyAt, 'YY.MM.DD')}</p>
      </div>
    </S.MobileCard>
  );
}

const S = {
  MobileCard: styled(motion.div)`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
    padding: 10px 0;
    .hotel {
      margin-bottom: 5px;
    }
    .title {
      font-size: 14px;
      color: ${(props) => props.theme.colors.gray700};
    }
    .status {
      display: flex;
      justify-content: flex-end;
      color: ${(props) => props.theme.colors.blue400};
      font-size: 14px;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 14px;
      margin-top: 10px;
      color: ${(props) => props.theme.colors.gray700};
      &__date {
        font-size: 13px;
      }
    }
  `,
};
