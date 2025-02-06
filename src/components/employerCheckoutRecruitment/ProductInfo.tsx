import React from 'react';
import styled from 'styled-components';
import { ProductInfoItem } from '@/types';
import { priceComma } from '@/utils';
import { RECRUITMENT_PRODUCT_NAME, RECRUITMENT_PRODUCT_OPTION_NAME, RECRUITMENT_PRODUCT_TYPE } from '@/constants/product';
import Tag from '@/components/common/Tag';
import { dateFormat } from '@/utils';
import SkeletonUI from '@/components/common/SkeletonUI';

interface ProductInfoProps {
  productInfo: ProductInfoItem | undefined;
  isLoading: boolean;
}

export default function ProductInfo({ productInfo, isLoading }: ProductInfoProps) {
  const price = productInfo?.price ?? 0;

  return (
    <S.ProductInfo>
      <h2 className="title">주문상품</h2>
      {isLoading && <SkeletonUI.Line style={{ height: '80px' }} />}
      {!isLoading && productInfo && (
        <S.ProductContainer>
          <S.ProductHeader>
            <span className="text type">상품타입</span>
            <span className="text">상품명</span>
            <span className="text">기간</span>
            <span className="text">상품금액</span>
          </S.ProductHeader>

          <S.ProductContent>
            <div className="product-item">
              <div className="product-item__text type">
                {productInfo?.type && (
                  <>
                    <Tag label="PC+M" margin="0 5px 0 0" height="18px" width="40px" fontSize="11px" />
                    <span>{RECRUITMENT_PRODUCT_TYPE[productInfo.type]}&nbsp;페이지</span>
                  </>
                )}
              </div>
              <div className="product-item__text">
                {productInfo?.name && <span>{RECRUITMENT_PRODUCT_NAME[productInfo.name]}</span>}&nbsp;공고
              </div>
              <div className="product-item__text duration">
                {productInfo?.duration && (
                  <>
                    <div style={{ width: '60px' }}>
                      <span>{productInfo?.duration}일</span>
                      {productInfo?.bonusDays !== 0 && <span>&nbsp;{`(+${productInfo.bonusDays}일)`}</span>}
                    </div>
                    <span className="product-item__text--date">
                      {dateFormat.dateRange(new Date(), productInfo.duration + (productInfo?.bonusDays ?? 0))}
                    </span>
                  </>
                )}
              </div>
              <div className="product-item__text">
                <span>{priceComma(price)}원</span>
              </div>
            </div>
            {productInfo?.options.map((option) => (
              <div className="option-item">
                <div className="option-item__text type">
                  <StyledCorner />
                  <span>옵션</span>
                </div>
                <p className="option-item__text">
                  <span>{RECRUITMENT_PRODUCT_OPTION_NAME[option.name]}</span>
                </p>
                <div className="option-item__text duration">
                  <div style={{ width: '60px', textAlign: 'right' }}>
                    <span>{option?.duration}일</span>
                    {option?.bonusDays && <span>&nbsp;{`(+${option.bonusDays}일)`}</span>}
                  </div>
                  <span className="option-item__text--date"> {dateFormat.dateRange(new Date(), option.duration + option.bonusDays)}</span>
                </div>
                <div className="option-item__text">
                  {priceComma(option.price)}원 {option.bonusDays}
                </div>
              </div>
            ))}
          </S.ProductContent>
        </S.ProductContainer>
      )}
    </S.ProductInfo>
  );
}
const StyledCorner = styled.span`
  display: inline-block;
  margin: 0 5px 5px 0;
  width: 8px;
  height: 8px;
  border: solid #c8c8c8;
  border-width: 0 0 1px 1px;
`;

const S = {
  ProductInfo: styled.div`
    padding: 0 30px 30px 30px;
    .title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
      color: ${({ theme }) => theme.colors.gray800};
    }
  `,
  ProductContainer: styled.div`
    border-top: 1px solid ${({ theme }) => theme.colors.black400};
    border-bottom: 1px solid ${({ theme }) => theme.colors.black400};
  `,
  ProductHeader: styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    height: 40px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
    & > :not(.type) {
      flex: 1;
    }
    .text {
      font-size: 14px;
    }
    .type {
      width: 120px;
    }
  `,
  ProductContent: styled.div`
    .product-item {
      display: flex;
      align-items: center;
      height: 40px;
      & > :not(.type) {
        flex: 1;
      }
      &__text {
        font-size: 14px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        &--date {
          color: ${({ theme }) => theme.colors.gray600};
          padding-left: 5px;
        }
      }
      .duration {
        white-space: nowrap;
      }
      .type {
        width: 120px;
        padding-left: 10px;
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
    }
    .option-item {
      display: flex;
      align-items: center;
      height: 40px;
      & > :not(.type) {
        flex: 1;
      }
      &__text {
        font-size: 14px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        &--date {
          color: ${({ theme }) => theme.colors.gray600};
          padding-left: 12px;
        }
      }
      .duration {
        white-space: nowrap;
      }
      .type {
        width: 120px;
        padding-left: 25px;
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
    }
  `,
};
