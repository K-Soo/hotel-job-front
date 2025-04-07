import { AllJobsKeyValuesKeys } from '@/constants/job';
import { EducationLevelKeys, experienceConditionKeys } from '@/types';
import styled from 'styled-components';
import { ALL_JOBS } from '@/constants/job';
import { EDUCATION_LEVEL, POSITION } from '@/constants';
import { EXPERIENCE_CONDITION } from '@/constants/recruitment';

interface RecruitDetailInfoProps {
  jobs: AllJobsKeyValuesKeys[];
  educationCondition: EducationLevelKeys;
  experienceCondition: experienceConditionKeys;
  recruitmentCapacity: number;
  department: string;
  position: keyof typeof POSITION | null;
  nationality: {
    foreigner: boolean;
    korean: boolean;
    marriageVisa: string;
  };
}

export default function RecruitDetailInfo({
  educationCondition,
  jobs,
  recruitmentCapacity,
  experienceCondition,
  department,
  position,
  nationality,
}: RecruitDetailInfoProps) {
  const getNationalityStatus = () => {
    if (nationality.korean && nationality.foreigner) {
      return '국적 무관';
    }
    if (nationality.korean && !nationality.foreigner) {
      return '내국인';
    }
    if (!nationality.korean && nationality.foreigner) {
      return '외국인';
    }
    return '-';
  };

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
            <S.RowValue>{getNationalityStatus()}</S.RowValue>
          </S.Row>

          <S.Row>
            <S.RowLabel>모집인원</S.RowLabel>
            <S.RowValue>{recruitmentCapacity}명</S.RowValue>
          </S.Row>

          {department && (
            <S.Row>
              <S.RowLabel>근무 부서</S.RowLabel>
              <S.RowValue>{department ? department : '-'}</S.RowValue>
            </S.Row>
          )}
        </div>

        <div className="right">
          <S.Row>
            <S.RowLabel>경력</S.RowLabel>
            <S.RowValue>{EXPERIENCE_CONDITION[experienceCondition]}</S.RowValue>
          </S.Row>

          {/* 외국인 or 국적무관 일때 비자조건 */}
          {nationality.marriageVisa && (
            <S.Row>
              <S.RowLabel>비자조건</S.RowLabel>
              <S.RowValue>{nationality.marriageVisa ? nationality.marriageVisa : '-'}</S.RowValue>
            </S.Row>
          )}

          <S.Row>
            <S.RowLabel>학력조건</S.RowLabel>
            <S.RowValue>
              <span>{EDUCATION_LEVEL[educationCondition]}</span>
              {educationCondition !== 'NOT_REQUIRED' && <span> 졸업</span>}
            </S.RowValue>
          </S.Row>

          {position && (
            <S.Row>
              <S.RowLabel>직급</S.RowLabel>
              <S.RowValue>{POSITION[position]}</S.RowValue>
            </S.Row>
          )}
        </div>
      </div>
    </S.RecruitDetailInfo>
  );
}

const S = {
  RecruitDetailInfo: styled.div`
    background-color: ${(props) => props.theme.colors.gray};

    /* border: 1px solid ${(props) => props.theme.colors.gray200}; */
    border-radius: 10px;
    padding: 10px 15px;
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
    color: ${(props) => props.theme.colors.black800};
    font-weight: 500;
  `,
  RowValue: styled.div`
    color: ${(props) => props.theme.colors.black};
    word-wrap: break-word;
    word-break: break-all;
    max-width: 200px;
    ${(props) => props.theme.media.tablet`
      max-width: 100%;
    `};
  `,
};
