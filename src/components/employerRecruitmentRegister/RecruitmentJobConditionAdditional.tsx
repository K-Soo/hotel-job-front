import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface RecruitmentJobConditionAdditionalProps {
  additionalTabs: Record<string, boolean>;
  handleClickToggleButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function RecruitmentJobConditionAdditional({
  additionalTabs,
  handleClickToggleButton,
}: RecruitmentJobConditionAdditionalProps) {
  return (
    <S.RecruitmentJobConditionAdditional>
      <motion.button
        className="item"
        name="workingDay"
        type="button"
        onClick={handleClickToggleButton}
        animate={additionalTabs.workingDay ? { backgroundColor: '#3182f6', color: '#FFFFFF' } : undefined}
      >
        근무요일
      </motion.button>

      <motion.button
        className="item"
        name="workingTime"
        type="button"
        onClick={handleClickToggleButton}
        animate={additionalTabs.workingTime ? { backgroundColor: '#3182f6', color: '#FFFFFF' } : undefined}
      >
        출퇴근 시간
      </motion.button>

      <motion.button
        className="item"
        name="benefits"
        type="button"
        onClick={handleClickToggleButton}
        animate={additionalTabs.benefits ? { backgroundColor: '#3182f6', color: '#FFFFFF' } : undefined}
      >
        복리후생
      </motion.button>
    </S.RecruitmentJobConditionAdditional>
  );
}

const S = {
  RecruitmentJobConditionAdditional: styled.div`
    height: auto;
    flex: 1;
    display: flex;
    height: 40px;
    .item {
      text-align: center;
      height: 100%;
      flex: 1;
      border: 1px solid ${({ theme }) => theme.colors.gray300};
      margin-right: 5px;
      border-radius: 5px;
      font-size: 14px;
      color: ${(props) => props.theme.colors.gray700};
      cursor: pointer;
    }
  `,
};
