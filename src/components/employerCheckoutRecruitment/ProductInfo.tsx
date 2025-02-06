import React from 'react';

import styled from 'styled-components';
import { Get } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import { useRouter } from 'next/router';
import Button from '@/components/common/style/Button';
import { errorCode } from '@/error';
import path from '@/constants/path';
import AmountInfo from '@/components/employerCheckoutRecruitment/AmountInfo';
import environment from '@/environment';
import useFetchQuery from '@/hooks/useFetchQuery';
import { ProductInfoItem } from '@/types';

interface ProductInfoProps {
  productInfo: ProductInfoItem | undefined;
}

export default function ProductInfo({ productInfo }: ProductInfoProps) {
  return (
    <S.ProductInfo>
      <h2 className="title">결제상품정보</h2>
      <div>
        <p>{productInfo?.name}</p>
        <p>{productInfo?.price}</p>
        <p>{productInfo?.discountRate}</p>
        <p>{productInfo?.duration}</p>
        <p>{productInfo?.bonusDays}</p>
      </div>
    </S.ProductInfo>
  );
}

const S = {
  ProductInfo: styled.div`
    padding: 30px;
    .title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
      color: ${({ theme }) => theme.colors.gray800};
    }
  `,
};
