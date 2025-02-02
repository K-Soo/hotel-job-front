import React from 'react';
import styled, { css } from 'styled-components';
import Button from '@/components/common/style/Button';
import Tag from '@/components/common/Tag';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { ProductRecruitmentListItem } from '@/types';
import { recruitmentProductSideMenuAtom, productFocusAtom } from '@/recoil/product';
import { priceComma } from '@/utils';
import SaleRate from '@/components/common/SaleRate';
import Icon from '@/icons/Icon';
import { RECRUITMENT_PRODUCT_DESCRIPTION, RECRUITMENT_PRODUCT_NAME } from '@/constants/product';
import { selectProductAtom } from '@/recoil/product';

interface ProductCardProps {
  margin?: string;
  product: ProductRecruitmentListItem;
}

export default function ProductCard({ product, margin }: ProductCardProps) {
  const [selectedDuration, setSelectedDuration] = React.useState(product.durations[2]);
  const setRecruitmentProductSideMenuAtom = useSetRecoilState(recruitmentProductSideMenuAtom);
  const setSelectProductAtom = useSetRecoilState(selectProductAtom);
  const [productFocusAtomState, setProductFocusAtomState] = useRecoilState(productFocusAtom);

  const handleClickProductPurchase = () => {
    setSelectProductAtom((prev) => ({
      ...prev,
      ...product,
      selectedDuration,
    }));
    setRecruitmentProductSideMenuAtom({ isOpen: true });
  };

  const onChangeDuration = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    const selectedDuration = product.durations.find((duration) => duration.id === selectedValue);
    if (!selectedDuration) {
      return;
    }
    setSelectedDuration(selectedDuration);
  };

  return (
    <S.ProductCard
      $margin={margin}
      $isFocus={productFocusAtomState.product === product.name}
      onClick={() => setProductFocusAtomState({ product: product.name })}
    >
      <S.Header>
        <div className="title-box">
          <h3 className="title-box__title">{RECRUITMENT_PRODUCT_NAME[product.name]}</h3>
          <div className="title-box__tags">
            <Tag label="PC+M" margin="0 0 0" height="28px" width="70px" fontSize="14px" />
          </div>
        </div>
      </S.Header>

      <S.Description>{RECRUITMENT_PRODUCT_DESCRIPTION[product.name]}</S.Description>

      <S.DurationSelectTitle className="select-title">기간설정</S.DurationSelectTitle>
      <S.DurationSelect>
        <select onChange={onChangeDuration} defaultValue={product.durations[2].id}>
          {product.durations.map((duration) => (
            <option value={duration.id} key={duration.id}>
              <span>{duration.duration}일</span>
              {duration.bonusDays !== 0 && <span>&nbsp;+&nbsp;{`(${duration.bonusDays}일)`}</span>}
            </option>
          ))}
        </select>
        <Icon className="icon" name="ArrowBottom14x14" width="16px" height="16px" />
      </S.DurationSelect>

      <S.Checkout>
        <S.PriceBox>
          {selectedDuration.discountRate !== 0 && <SaleRate rate={selectedDuration.discountRate * 100} />}
          {selectedDuration.discountRate !== 0 && <del>{priceComma(selectedDuration.price)}원</del>}
          <strong className="sale-price">{priceComma(selectedDuration.price * (1 - selectedDuration.discountRate))}원</strong>
        </S.PriceBox>

        <Button label="상품 선택" variant="checkoutOutline" width="150px" onClick={handleClickProductPurchase} />
      </S.Checkout>
    </S.ProductCard>
  );
}

const S = {
  ProductCard: styled.div<{ $margin?: string; $isFocus: boolean }>`
    border: 1px solid ${(props) => props.theme.colors.gray500};
    margin: ${(props) => props.$margin || '0'};
    border-radius: 10px;
    padding: 20px;
    width: 100%;
    margin-bottom: 30px;
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
      align-items: flex-end;
      &__title {
        font-size: 22px;
        font-weight: 600;
        color: ${(props) => props.theme.colors.gray800};
      }
      &__tags {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  `,
  Description: styled.p`
    margin: 10px 0;
    font-size: 14px;
    color: ${(props) => props.theme.colors.black700};
  `,
  PriceBox: styled.div`
    margin-right: 15px;
    .sale-price {
      display: inline-block;
      padding-left: 10px;
      padding-bottom: 5px;
      font-size: 20px;
      font-weight: 600;
      color: ${(props) => props.theme.colors.black400};
    }
  `,
  Checkout: styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  `,
  DurationSelectTitle: styled.p`
    padding-bottom: 2px;
    font-size: 15px;
  `,
  DurationSelect: styled.div`
    height: 40px;
    border-radius: 5px;
    margin-bottom: 10px;
    max-width: 200px;
    width: 100%;
    background-color: white;
    position: relative;
    .icon {
      top: 50%;
      transform: translateY(-50%);
      right: 15px;
      position: absolute;
      color: ${(props) => props.theme.colors.black600};
    }
    select {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      padding-left: 15px;
      border-radius: inherit;
      border: 1px solid ${(props) => props.theme.colors.gray300};
      color: ${(props) => props.theme.colors.black600};
      &:focus {
        border: 1px solid ${(props) => props.theme.colors.blue300};
      }
      &:hover {
        border: 1px solid ${(props) => props.theme.colors.blue500};
      }
    }
  `,
};
