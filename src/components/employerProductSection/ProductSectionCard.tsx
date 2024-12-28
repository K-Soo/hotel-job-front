import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import Button from '@/components/common/style/Button';
import Select from '@/components/common/style/Select';
import Tag from '@/components/common/Tag';
import { productUseDateOptions } from '@/constants/options';
import { useSetRecoilState } from 'recoil';
import { productOptionAsideMenuAtom } from '@/recoil/payment';

interface ProductSectionCardProps {
  margin?: string;
  title: string;
}

export default function ProductSectionCard({ margin, title }: ProductSectionCardProps) {
  const [isFocus, setIsFocus] = React.useState(false);

  const setProductOptionAsideMenuAtom = useSetRecoilState(productOptionAsideMenuAtom);

  const handleClickProductPurchase = () => {
    setProductOptionAsideMenuAtom({ isOpen: true });
  };

  return (
    <>
      <S.ProductSectionCard $margin={margin} $isFocus={isFocus} onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)}>
        <S.Header>
          <div className="title-box">
            <h3 className="title-box__title">{title}</h3>
            <div className="title-box__tags"></div>
          </div>
          <div className="feature-box"></div>
        </S.Header>
        <S.Option></S.Option>

        <Select options={productUseDateOptions} />

        <S.Checkout>
          <Button label="상품 선택" variant="primary" width="200px" onClick={handleClickProductPurchase} />
        </S.Checkout>
      </S.ProductSectionCard>
    </>
  );
}

const S = {
  ProductSectionCard: styled(motion.div)<{ $margin?: string; $isFocus: boolean }>`
    height: 200px;
    border: 1px solid ${(props) => props.theme.colors.gray500};
    margin: ${(props) => props.$margin || '0'};
    border-radius: 10px;
    padding: 20px;
    width: 100%;
    cursor: pointer;
    ${(props) =>
      props.$isFocus &&
      css`
        background-color: ${(props) => props.theme.colors.blue50};
        border: 1px solid ${(props) => props.theme.colors.blue500};
      `};
  `,
  Header: styled.div`
    .title-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &__title {
        font-size: 22px;
        font-weight: 600;
        color: ${(props) => props.theme.colors.gray800};
      }
      &__tags {
        display: flex;
        gap: 5px;
      }
    }
  `,
  Option: styled.div`
    border: 1px solid red;
  `,
  Checkout: styled.div`
    border: 1px solid red;
  `,
};
