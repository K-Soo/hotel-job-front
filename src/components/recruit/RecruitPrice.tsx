import { SALARY_TYPE } from '@/constants';
import { SalaryTypeKeys } from '@/types';
import styled, { css } from 'styled-components';
import { priceComma } from '@/utils';
interface RecruitPriceProps {
  fonSize?: string;
  salaryAmount: number;
  salary: SalaryTypeKeys;
}

export default function RecruitPrice({ fonSize, salaryAmount, salary }: RecruitPriceProps) {
  return (
    <S.RecruitPrice $fonSize={fonSize} $salary={salary}>
      <span className="pay-type">{SALARY_TYPE[salary]}</span>
      <span className="pay-price">{priceComma(salaryAmount)}</span>
    </S.RecruitPrice>
  );
}

const S = {
  RecruitPrice: styled.div<{ $fonSize?: string; $salary: SalaryTypeKeys }>`
    background-color: ${(props) => props.theme.colors.gray100};
    padding: 4px 5px;
    border-radius: 4px;
    width: fit-content;
    font-size: ${(props) => props.$fonSize || '14px'};
    white-space: nowrap;
    .pay-type {
      letter-spacing: 1px;
      padding-right: 5px;
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
      letter-spacing: 0.3px;
      font-weight: 400;
    }
  `,
};
