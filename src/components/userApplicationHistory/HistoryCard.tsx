import React from 'react';
import { ApplicationHistory } from '@/types';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { APPLICATION_STATUS, REVIEW_STAGE_STATUS } from '@/constants/application';
import Button from '@/components/common/style/Button';

interface HistoryCardProps {
  item: ApplicationHistory;
}

export default function HistoryCard({ item }: HistoryCardProps) {
  const [isExpand, setIsExpand] = React.useState(false);

  return (
    <S.HistoryCard onClick={() => setIsExpand((prev) => !prev)}>
      <motion.div
        className="container-card"
        initial={{ backgroundColor: '#fff' }}
        whileHover={
          {
            // backgroundColor: '#fbfdff',
          }
        }
      >
        <div className="hotel-name">{item.recruitment.hotelName}</div>
        <div className="review-stage">{REVIEW_STAGE_STATUS[item.reviewStageStatus]}</div>
        <div className="view">{item.isView ? '열람' : '미열람'}</div>
        <div className="application-status">{APPLICATION_STATUS[item.applicationStatus]}</div>
      </motion.div>
      <AnimatePresence>
        <S.ExpandForm initial={{ height: 0, opacity: 0 }} animate={{ height: isExpand ? '50px' : 0, opacity: isExpand ? 1 : 0 }}>
          <Button label="지원취소" variant="tertiary" height="35px" width="80px" fontSize="14px" />
        </S.ExpandForm>
      </AnimatePresence>
    </S.HistoryCard>
  );
}

const S = {
  HistoryCard: styled(motion.div)`
    min-height: 50px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
    ${(props) => props.theme.media.mobile`
      padding: 0;
      `};
    .container-card {
      height: 50px;
      padding: 0 10px;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      white-space: nowrap;
      cursor: pointer;
      .hotel-name {
        flex-grow: 1;
        height: 100%;
        display: flex;
        align-items: center;
        &:hover {
          text-decoration: underline;
        }
      }
      .review-stage {
        flex-basis: 15%;
        padding: 0 5px;
        text-align: center;
      }
      .view {
        flex-basis: 15%;
        padding: 0 15px;
        text-align: center;
        color: ${({ theme }) => theme.colors.gray500};
      }
      .application-status {
        color: ${({ theme }) => theme.colors.gray500};
        text-align: right;
      }
    }
  `,
  ExpandForm: styled(motion.div)`
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background-color: ${({ theme }) => theme.colors.gray}; */
  `,
};
