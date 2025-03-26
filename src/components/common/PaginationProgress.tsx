import styled from 'styled-components';
import { motion } from 'framer-motion';

interface PaginationProgressProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationProgress({ currentPage, totalPages }: PaginationProgressProps) {
  const progressRatio = currentPage / totalPages;

  return (
    <S.PaginationProgress>
      {Array.from({ length: totalPages - 1 }).map((_, i) => (
        <S.Tick key={i} style={{ left: `${((i + 1) / totalPages) * 100}%` }} />
      ))}

      <S.ProgressBar
        layout
        initial={{ width: 0 }}
        animate={{ width: `${progressRatio * 100}%` }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </S.PaginationProgress>
  );
}

const S = {
  PaginationProgress: styled.div`
    width: calc(100% - 30px);
    position: relative;
    margin: 0 auto;
    height: 6px;
    background-color: #eee;
    border-radius: 3px;
    overflow: hidden;
  `,
  ProgressBar: styled(motion.div)`
    height: 100%;
    background-color: #0070f3;
    border-radius: 3px;
  `,
  Tick: styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: white;
  `,
};
