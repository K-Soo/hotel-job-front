import { ApplicantReviewStageStatusKey, ApplicationHistoryStatus } from '@/types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SkeletonUI from '@/components/common/SkeletonUI';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
interface HistoryStatusProps {
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
  initial: { color: '#6b7684' },
  visible: { color: '#2272eb' },
  hover: { color: '#3182f6' },
};

interface Query extends ParsedUrlQuery {
  status?: Lowercase<ApplicantReviewStageStatusKey>;
}

export default function HistoryStatus({ data, isLoading, handleClickReviewStatus }: HistoryStatusProps) {
  const router = useRouter();
  const { status = 'total' } = router.query as Query;

  return (
    <S.HistoryStatus>
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
    </S.HistoryStatus>
  );
}

const S = {
  HistoryStatus: styled.div`
    display: flex;
    align-items: center;
    height: 80px;
    color: ${(props) => props.theme.colors.gray[700]};
    margin-bottom: 30px;
    ${(props) => props.theme.media.tablet`
      height: 50px;
    `};
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      cursor: pointer;
      &__count {
        font-size: 38px;
        min-width: 50px;
        min-height: 38px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        ${(props) => props.theme.media.tablet`
          font-size: 24px;
        `};
        ${(props) => props.theme.media.mobile`
          font-size: 20px;
        `};
      }
      &__text {
        font-weight: 400;
        letter-spacing: 0.5px;
        padding-top: 10px;
        font-size: 14px;
        ${(props) => props.theme.media.mobile`
          font-size: 12px;
          padding-top: 0;
        `};
      }
    }
  `,
};
