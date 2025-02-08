import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MembershipLevel } from '@/types';
import { priceComma } from '@/utils';
interface MembershipProgressBarProps {
  membershipInfo: {
    previousScore: number;
    addedScore: number;
    currentScore: number;
    currentLevel: MembershipLevel;
    previousLevel: MembershipLevel;
    isUpgraded: boolean;
    previousMinScore: number;
    previousMaxScore: number;
  };
}

export default function MembershipProgressBar({ membershipInfo }: MembershipProgressBarProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const { previousScore, addedScore, currentScore, currentLevel, previousLevel, previousMinScore, previousMaxScore } = membershipInfo;

  const totalRange = previousMaxScore - previousMinScore;
  const startPercentage = ((previousScore - previousMinScore) / totalRange) * 100;
  const addedPercentage = (addedScore / totalRange) * 100;
  const endPercentage = startPercentage + addedPercentage;

  return (
    <S.ProgressBarWrapper ref={ref}>
      <S.LevelContainer>
        <S.LevelBadge>{previousLevel}</S.LevelBadge>
        <S.LevelBadge>{currentLevel}</S.LevelBadge>
      </S.LevelContainer>

      <S.ProgressBar>
        <S.StaticBar style={{ width: `${startPercentage}%` }} />
        {addedScore > 0 && <S.AddedScore>+ {priceComma(addedScore)}</S.AddedScore>}

        <S.AnimatedBar
          initial={{ width: '0%' }}
          animate={inView ? { width: `${addedPercentage}%` } : {}}
          transition={{ delay: 1, duration: 1.5, ease: 'easeInOut' }}
        />

        {/* 현재 점수 표시 */}
        <S.ScoreLabel style={{ left: `${endPercentage}%` }}>{currentScore.toLocaleString()}점</S.ScoreLabel>

        {/* 추가된 점수 표시 */}
        {addedScore > 0 && (
          <S.ScoreLabel style={{ left: `${startPercentage + addedPercentage / 2}%` }} isAdded>
            +{addedScore.toLocaleString()}점
          </S.ScoreLabel>
        )}
      </S.ProgressBar>

      <S.ScoreRange>
        <span>{priceComma(previousMinScore.toLocaleString())}점</span>
        <span>{priceComma(previousMaxScore.toLocaleString())}점</span>
      </S.ScoreRange>
    </S.ProgressBarWrapper>
  );
}

const S = {
  ProgressBarWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  `,

  LevelContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
  `,

  LevelBadge: styled.div`
    background-color: ${({ theme }) => theme.colors.gray200};
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 13px;
  `,

  ProgressBar: styled.div`
    position: relative;
    width: 100%;
    height: 18px;
    background-color: ${({ theme }) => theme.colors.gray300};
    border-radius: 12px;
    overflow: hidden;
  `,

  // 🔵 기존 점수 바 (고정)
  StaticBar: styled.div`
    position: absolute;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.blue500}; // ✔️ blue500 적용
    border-radius: inherit;
  `,
  AddedScore: styled.p`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    color: white;
    font-size: 13px;
    font-weight: 300;
  `,

  // 🔵 추가된 점수 바 (애니메이션)
  AnimatedBar: styled(motion.div)`
    position: absolute;
    left: 0;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.blue500}; // ✔️ blue500 적용
    transition: background-color 0.3s ease;
    border-radius: inherit;
  `,

  ScoreLabel: styled.div<{ isAdded?: boolean }>`
    position: absolute;
    top: -30px;
    transform: translateX(-50%);
    background-color: ${({ isAdded, theme }) => (isAdded ? theme.colors.red300 : theme.colors.blue500)};
    color: white;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    white-space: nowrap;
  `,

  ScoreRange: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray600};
  `,
};
