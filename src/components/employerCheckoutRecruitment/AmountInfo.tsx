import { PaymentRecruitmentDetailAmountInfo } from '@/types';
import styled from 'styled-components';
import Line from '@/components/common/Line';
import { priceComma } from '@/utils';
import SkeletonUI from '@/components/common/SkeletonUI';

interface AmountInfoProps {
  amountInfo: PaymentRecruitmentDetailAmountInfo | undefined;
  isLoading: boolean;
  children: React.ReactNode;
}

export default function AmountInfo({ amountInfo, isLoading, children }: AmountInfoProps) {
  return (
    <S.AmountInfo>
      <h2 className="title">결제 정보</h2>
      {isLoading && (
        <>
          <SkeletonUI.Line style={{ height: '35px', marginBottom: '5px' }} />
          <SkeletonUI.Line style={{ height: '35px', marginBottom: '5px' }} />
          <SkeletonUI.Line style={{ height: '35px', marginBottom: '5px' }} />
          <SkeletonUI.Line style={{ height: '35px', marginBottom: '5px' }} />
          <SkeletonUI.Line style={{ height: '35px', marginBottom: '30px' }} />
        </>
      )}
      {!isLoading && amountInfo && (
        <S.AmountContainer>
          <div className="item">
            <span className="item__title">주문금액</span>
            <p style={{ fontSize: '14px' }}>{priceComma(amountInfo?.originalAmount)}원</p>
          </div>

          <div className="item">
            <span className="item__title">상품할인</span>
            <p className="item__discount">
              <span className="item__discount--text">{amountInfo.discountAmount === 0 ? '' : '-'}</span>
              <span className="item__discount--text">{priceComma(amountInfo.discountAmount)}</span>원
            </p>
          </div>

          <div className="item">
            <span className="item__title">멤버십 할인</span>
            <p className="item__discount">
              <span className="item__discount--text">{amountInfo.membershipDiscountAmount === 0 ? '' : '-'}</span>
              <span className="item__discount--text">{priceComma(amountInfo?.membershipDiscountAmount)}</span>원
            </p>
          </div>

          {amountInfo.couponDiscountAmount !== 0 && (
            <div className="item">
              <span className="item__title">쿠폰 할인</span>
              <p className="item__discount">
                <span className="item__discount--text">{amountInfo.couponDiscountAmount === 0 ? '' : '-'}</span>
                <span className="item__discount--text">{priceComma(amountInfo?.couponDiscountAmount)}</span>원
              </p>
            </div>
          )}

          <div className="item">
            <span className="item__title">최종 할인금액</span>
            <p className="item__discount">
              <span className="item__discount--text">-</span>
              <span className="item__discount--text">{priceComma(amountInfo.totalDiscountAmount)}</span>원
            </p>
          </div>

          <Line margin="20px 0" />

          <div className="total-amount">
            <span>결제금액</span>
            {amountInfo.TotalAmount === 0 && <strong className="total-amount__free">무료</strong>}
            {amountInfo.TotalAmount !== 0 && <strong className="total-amount__price">{priceComma(amountInfo.TotalAmount)}</strong>}
          </div>
        </S.AmountContainer>
      )}

      {children}
    </S.AmountInfo>
  );
}

const S = {
  AmountInfo: styled.div`
    position: sticky;
    top: 70px;
    height: 500px;
    .title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
    }
  `,
  AmountContainer: styled.div`
    margin-bottom: 30px;
    .item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      color: ${(props) => props.theme.colors.black400};
      font-weight: 500;
      &__title {
        color: ${(props) => props.theme.colors.gray700};
        font-size: 14px;
      }
      &__discount {
        font-size: 14px;
        &--text {
          color: ${(props) => props.theme.colors.red400};
          padding-right: 2px;
        }
      }
    }
    .total-amount {
      display: flex;
      justify-content: space-between;
      font-weight: 600;
      font-size: 20px;
      color: ${(props) => props.theme.colors.black400};
      &__price {
        color: ${(props) => props.theme.colors.red400};
        &::after {
          content: '원';
          padding-left: 2px;
        }
      }
      &__free {
        color: ${(props) => props.theme.colors.red400};
      }
    }
  `,
};
