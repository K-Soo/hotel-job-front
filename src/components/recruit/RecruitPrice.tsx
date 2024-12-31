import styled from 'styled-components';

interface RecruitPriceProps {
  fonSize?: string;
}

export default function RecruitPrice({ fonSize }: RecruitPriceProps) {
  return (
    <S.RecruitPrice $fonSize={fonSize}>
      <span className="pay-type">월급</span>
      <span className="pay-price">5,200,000</span>
    </S.RecruitPrice>
  );
}

const S = {
  RecruitPrice: styled.div<{ $fonSize?: string }>`
    background-color: ${(props) => props.theme.colors.gray100};
    padding: 4px 5px;
    border-radius: 4px;
    width: fit-content;
    font-size: ${(props) => props.$fonSize || '14px'};
    .pay-type {
      letter-spacing: 1px;
      padding-right: 5px;
      color: #ff501b; //월급
      /* color: #00b0a6; //시급 */
      /* color: #8050c8; //일급 */
      /* color: #00a1ef; //연봉 */
    }
    .pay-price {
      letter-spacing: 0.3px;
      font-weight: 400;
    }
  `,
};
