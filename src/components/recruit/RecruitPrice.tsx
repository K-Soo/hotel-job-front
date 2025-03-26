import { SALARY_TYPE, SHORT_SALARY_TYPE } from '@/constants';
import { SalaryTypeKeys } from '@/types';
import styled, { css } from 'styled-components';
import { priceComma } from '@/utils';
import { formatSalaryDisplay } from '@/utils';
interface RecruitPriceProps {
  fonSize?: string;
  salaryAmount: number;
  salary: SalaryTypeKeys;
}

export default function RecruitPrice({ fonSize, salaryAmount, salary }: RecruitPriceProps) {
  return (
    <S.RecruitPrice $fonSize={fonSize} $salary={salary}>
      <span className="pay-type">{SHORT_SALARY_TYPE[salary]}</span>
      {/* <span className="pay-price">{priceComma(salaryAmount)}</span> */}
      <span className="pay-price">{formatSalaryDisplay(salaryAmount, salary)}</span>
    </S.RecruitPrice>
  );
}

const S = {
  RecruitPrice: styled.div<{ $fonSize?: string; $salary: SalaryTypeKeys }>`
    border-radius: 4px;
    width: fit-content;
    font-size: ${(props) => props.$fonSize || '14px'};
    display: flex;
    /* flex-direction: row-reverse; */
    align-items: center;
    white-space: nowrap;
    .pay-type {
      letter-spacing: 1px;
      padding: 0 2px;
      ${(props) =>
        props.$salary === 'ANNUAL' &&
        css`
          color: #00a1ef; //연봉
        `};
      ${(props) =>
        props.$salary === 'MONTHLY' &&
        css`
          color: #ff501b; //월급
        `};
      ${(props) =>
        props.$salary === 'DAILY' &&
        css`
          color: #8050c8; //일급
        `};
      ${(props) =>
        props.$salary === 'HOURLY' &&
        css`
          color: #00b0a6; //시급
        `};
    }
    .pay-price {
      letter-spacing: 0.1px;
      font-weight: 500;
      color: ${(props) => props.theme.colors.black300};
    }
  `,
};
