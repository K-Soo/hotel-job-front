import styled from 'styled-components';
import { SalaryTypeKeys } from '@/types';

interface MinimumWageProps {
  salaryType: SalaryTypeKeys;
}

export const minimumWageText: Record<SalaryTypeKeys, string> = {
  ANNUAL: '25,155,240원(월 209시간 기준)',
  MONTHLY: '2,096,270원(월 209시간 기준)',
  DAILY: '401,200원(주 40시간 기준)',
  HOURLY: '10,030원',
} as const;

export const minimumWageType: Record<SalaryTypeKeys, string> = {
  ANNUAL: '연봉',
  MONTHLY: '월급',
  DAILY: '주급',
  HOURLY: '시급',
} as const;

export default function MinimumWage({ salaryType = 'HOURLY' }: MinimumWageProps) {
  return (
    <S.MinimumWage>
      <p className="guide">
        최저임금 : {minimumWageType[salaryType]}&nbsp;
        <strong className="guide__focus">{minimumWageText[salaryType]}</strong>
      </p>
      <a className="guide-url" href="https://www.minimumwage.go.kr/minWage/about/main.do" target="_blank">
        최저임금제도 안내
      </a>
    </S.MinimumWage>
  );
}

const S = {
  MinimumWage: styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .guide {
      font-size: 13px;
      color: ${({ theme }) => theme.colors.black200};
      &__focus {
        color: ${({ theme }) => theme.colors.blue500};
      }
    }
    .guide-url {
      color: ${({ theme }) => theme.colors.blue400};
      font-size: 13px;
      text-decoration: underline;
    }
  `,
};
