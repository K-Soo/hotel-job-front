import { EducationLevelKeys } from '@/types';
import { EDUCATION_LEVEL } from '@/constants';
import styled from 'styled-components';

interface EducationProps {
  education: EducationLevelKeys;
}

export default function Education({ education }: EducationProps) {
  return (
    <S.Education>
      <div className="item">
        <span className="item__name">{EDUCATION_LEVEL[education]} 졸업</span>
      </div>
    </S.Education>
  );
}

const S = {
  Education: styled.div`
    margin-bottom: 80px;
    .item {
      height: 35px;
      display: flex;
      align-items: center;
      width: fit-content;
      &__name {
        min-width: 80px;
        color: ${({ theme }) => theme.colors.black400};
      }
    }
  `,
};
