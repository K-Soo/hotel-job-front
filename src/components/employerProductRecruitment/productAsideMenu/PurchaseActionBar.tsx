import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import { useRouter } from 'next/router';
import path from '@/constants/path';
import { selectProductAtom, amountSelector } from '@/recoil/product';
import { useRecoilValue } from 'recoil';
import { RECRUITMENT_PRODUCT_NAME, RECRUITMENT_PRODUCT_TYPE, RECRUITMENT_PRODUCT_OPTION_NAME } from '@/constants/product';
import { priceComma } from '@/utils';

export default function PurchaseActionBar() {
  const router = useRouter();

  const amountSelectorValue = useRecoilValue(amountSelector);
  console.log('amountSelectorValue: ', amountSelectorValue);

  const handleClickCheckout = () => {
    router.push(path.EMPLOYER_PRODUCT_CHECKOUT);
  };

  return (
    <S.PurchaseActionBar>
      <S.TotalPrice>
        <span>총 상품금액</span>
        <span>{priceComma(amountSelectorValue.totalProductPrice)}원</span>
      </S.TotalPrice>

      <S.TotalPrice>
        <span>총 할인금액</span>
        <span>{priceComma(amountSelectorValue.totalDiscountPrice)}원</span>
      </S.TotalPrice>

      <S.TotalPaymentAmount>
        <p>총 결제 금액</p>
        <p>{priceComma(amountSelectorValue.totalPaymentAmount)}원</p>
      </S.TotalPaymentAmount>

      <Button
        label="상품 구매"
        variant="checkout"
        height="50px"
        fontSize="20px"
        borderRadius="3px"
        margin="15px 0 0 0"
        onClick={handleClickCheckout}
      />
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
