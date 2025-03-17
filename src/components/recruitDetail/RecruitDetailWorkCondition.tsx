import { SalaryTypeKeys, WorkingDayListKeys } from '@/types';
import styled from 'styled-components';
import { WORKING_DAY_LIST, EMPLOYMENT_TYPE } from '@/constants/recruitment';
import { SALARY_TYPE } from '@/constants';
import { priceComma, dateFormat } from '@/utils';

interface RecruitDetailWorkConditionProps {
  employment: { INTERN: boolean; CONTRACT: boolean; FULL_TIME: boolean; PART_TIME: boolean; DAILY_WORKER: boolean };
  workingDay: WorkingDayListKeys;
  workingTime: { end: string; start: string };
  salaryAmount: number;
  salaryType: SalaryTypeKeys;
}

export default function RecruitDetailWorkCondition({
  employment,
  salaryAmount,
  salaryType,
  workingDay,
  workingTime,
}: RecruitDetailWorkConditionProps) {
  const selectedTypes = Object.entries(employment)
    .filter(([, value]) => value)
    .map(([key]) => EMPLOYMENT_TYPE[key as keyof typeof EMPLOYMENT_TYPE]);

  return (
    <S.RecruitDetailWorkCondition>
      <div className="work-container">
        <div className="left">
          <S.Row>
            <S.RowLabel>고용형태</S.RowLabel>
            <S.RowValue>{selectedTypes.length > 0 ? selectedTypes.join(', ') : '-'}</S.RowValue>
          </S.Row>

          {workingDay && (
            <S.Row>
              <S.RowLabel>근무시간</S.RowLabel>
              <S.RowValue>{WORKING_DAY_LIST[workingDay]}</S.RowValue>
            </S.Row>
          )}
        </div>

        <div className="right">
          <S.Row>
            <S.RowLabel>급여</S.RowLabel>
            <S.RowValue>
              {SALARY_TYPE[salaryType]} {priceComma(salaryAmount)}원
            </S.RowValue>
          </S.Row>

          {workingTime.start && workingTime.end && (
            <S.Row>
              <S.RowLabel>출퇴근 시간</S.RowLabel>
              <S.RowValue>{<span>{dateFormat.timeRange(workingTime.start, workingTime.end)}</span>}</S.RowValue>
            </S.Row>
          )}
        </div>
      </div>
    </S.RecruitDetailWorkCondition>
  );
}

const S = {
  RecruitDetailWorkCondition: styled.div`
    border-radius: 10px;
    padding: 10px 15px;
    background-color: ${(props) => props.theme.colors.gray};
    margin-bottom: 50px;
    font-size: 14px;
    .work-container {
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
