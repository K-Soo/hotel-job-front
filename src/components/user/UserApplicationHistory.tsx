import { ApplicantReviewStageStatusKey, ApplicationHistoryStatus } from '@/types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SkeletonUI from '@/components/common/SkeletonUI';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';

interface UserApplicationHistoryProps {
  isLoading: boolean;
  data: ApplicationHistoryStatus | undefined;
  handleClickReviewStatus: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const STATUS_LABELS: { key: keyof ApplicationHistoryStatus; label: string }[] = [
  { key: 'TOTAL', label: '전체' },
  { key: 'DOCUMENT', label: '지원완료' },
  { key: 'INTERVIEW', label: '면접요청' },
  { key: 'ACCEPT', label: '최종합격' },
  { key: 'REJECT', label: '불합격' },
];

const variant = {
  initial: { color: '#333333' },
  visible: { color: '#2272eb' },
  hover: { color: '#3182f6' },
};

export default function UserApplicationHistory({ data, handleClickReviewStatus, isLoading }: UserApplicationHistoryProps) {
  return (
    <S.UserApplicationHistory>
      <div className="history-container">
        <S.Title>지원 현황</S.Title>
        <S.HistoryContent>
          {STATUS_LABELS.map(({ key, label }) => (
            <motion.button
              key={key}
              name={key.toLowerCase()}
              className="item"
              variants={variant}
              animate={key.toLowerCase() === status ? 'visible' : undefined}
              initial="initial"
              whileHover="hover"
              onClick={handleClickReviewStatus}
            >
              <strong className="item__count">
                {isLoading ? <SkeletonUI.Line style={{ height: '30px' }} /> : <span>{data?.[key] ?? '0'}</span>}
              </strong>
              <span className="item__text">{label}</span>
            </motion.button>
          ))}
        </S.HistoryContent>
      </div>
    </S.UserApplicationHistory>
  );
}

const S = {
  UserApplicationHistory: styled.div`
    width: 100%;
    .history-container {
      margin: 0 auto;
      max-width: 500px;
    }
  `,
  Title: styled.div`
    font-size: 16px;
    color: ${({ theme }) => theme.colors.gray600};
    margin-bottom: 10px;
  `,
  HistoryContent: styled.div`
    background-color: ${({ theme }) => theme.colors.gray100};
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
    border-radius: 10px;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 14px;
      cursor: pointer;
      &__count {
        height: 30px;
        font-weight: 500;
      }
      &__text {
        letter-spacing: 0.5px;
        font-size: 14px;
        ${(props) => props.theme.media.mobile`
          font-size: 12px;
          padding-top: 0;
        `};
      }
    }
  `,
};
