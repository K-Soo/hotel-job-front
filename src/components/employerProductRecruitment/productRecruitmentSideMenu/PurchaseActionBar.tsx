import styled from 'styled-components';
import { amountSelector } from '@/recoil/product';
import { useRecoilValue } from 'recoil';
import { priceComma } from '@/utils';

interface PurchaseActionBarProps {
  children: React.ReactNode;
}

export default function PurchaseActionBar({ children }: PurchaseActionBarProps) {
  const amountSelectorValue = useRecoilValue(amountSelector);

  return (
    <S.PurchaseActionBar>
      <S.TotalPrice>
        <span>총 상품금액</span>
        <span>{priceComma(amountSelectorValue.totalProductPrice)}원</span>
      </S.TotalPrice>

      <S.TotalPrice>
        <span>상품 할인금액</span>
        <span>{priceComma(amountSelectorValue.totalDiscountPrice)}원</span>
      </S.TotalPrice>

      <S.TotalPaymentAmount>
        <p>총 결제 금액</p>
        <p>{priceComma(amountSelectorValue.totalPaymentAmount)}원</p>
      </S.TotalPaymentAmount>

      {children}
    </S.PurchaseActionBar>
  );
}

const S = {
  PurchaseActionBar: styled.div`
    min-height: 100px;
    background-color: ${(props) => props.theme.colors.black400};
    padding: 20px;
  `,
  ProductRow: styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: ${(props) => props.theme.colors.white};
    .price {
      flex-basis: 100px;
      text-align: end;
    }
  `,
  TotalPrice: styled.div`
    padding: 2px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme.colors.gray300};
    font-size: 15px;
  `,
  TotalPaymentAmount: styled.div`
    display: flex;
    justify-content: space-between;
    color: ${(props) => props.theme.colors.red300};
    font-size: 18px;
    margin-top: 10px;
    font-weight: 500;
  `,
};
