import { AllJobsKeyValuesKeys } from '@/constants/job';
import { EducationLevelKeys, experienceConditionKeys } from '@/types';
import styled from 'styled-components';
import { ALL_JOBS } from '@/constants/job';
import { EDUCATION_LEVEL, POSITION } from '@/constants';
import { EXPERIENCE_CONDITION } from '@/constants/recruitment';

interface RecruitDetailInfoProps {
  jobs: AllJobsKeyValuesKeys[];
  educationCondition: EducationLevelKeys;
  recruitmentCapacity: number;
  experience: experienceConditionKeys;
  department: string;
  position: keyof typeof POSITION | null;
}

export default function RecruitDetailInfo({
  educationCondition,
  jobs,
  recruitmentCapacity,
  experience,
  department,
  position,
}: RecruitDetailInfoProps) {
  return (
    <S.RecruitDetailInfo>
      <div className="info-container">
        <div className="left">
          <S.Row>
            <S.RowLabel>직무</S.RowLabel>
            <S.RowValue>{jobs.length > 0 ? jobs.map((job) => ALL_JOBS[job]).join(', ') : null}</S.RowValue>
          </S.Row>
          <S.Row>
            <S.RowLabel>국적</S.RowLabel>
            <S.RowValue>국적 무관</S.RowValue>
          </S.Row>

          <S.Row>
            <S.RowLabel>모집인원</S.RowLabel>
            <S.RowValue>{recruitmentCapacity}명</S.RowValue>
          </S.Row>

          <S.Row>
            <S.RowLabel>근무 부서</S.RowLabel>
            <S.RowValue>{department ? department : '-'}</S.RowValue>
          </S.Row>
        </div>

        <div className="right">
          <S.Row>
            <S.RowLabel>경력</S.RowLabel>
            <S.RowValue>{EXPERIENCE_CONDITION[experience]}</S.RowValue>
          </S.Row>

          {/* 외국인 or 국적무관 일때 비자조건 렌더링 */}
          <S.Row>
            <S.RowLabel>비자조건</S.RowLabel>
            <S.RowValue>-</S.RowValue>
          </S.Row>

          <S.Row>
            <S.RowLabel>학력조건</S.RowLabel>
            <S.RowValue>{EDUCATION_LEVEL[educationCondition]}</S.RowValue>
          </S.Row>

          <S.Row>
            <S.RowLabel>직급</S.RowLabel>
            <S.RowValue>{position ? POSITION[position] : '-'}</S.RowValue>
          </S.Row>
        </div>
      </div>
    </S.RecruitDetailInfo>
  );
}

const S = {
  RecruitDetailInfo: styled.div`
    border-radius: 10px;
    padding: 10px 15px;
    background-color: ${(props) => props.theme.colors.gray};
    margin-bottom: 50px;
    font-size: 14px;
    .info-container {
      display: flex;
      ${(props) => props.theme.media.tablet`
        flex-direction: column;
      `};
      .left {
        flex: 50%;
      }
      .right {
        flex: 50%;
      }
    }
  `,
  Row: styled.div`
    display: flex;
    padding: 8px 0;
    &:last-child {
      margin-bottom: 0;
    }
  `,
  RowLabel: styled.div`
    flex-basis: 80px;
    color: ${(props) => props.theme.colors.black600};
    font-weight: 300;
  `,
  RowValue: styled.div`
    color: ${(props) => props.theme.colors.black};
  `,
};
