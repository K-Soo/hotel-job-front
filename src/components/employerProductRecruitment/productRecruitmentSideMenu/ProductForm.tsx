import React from 'react';
import styled from 'styled-components';
import { RECRUITMENT_PRODUCT_NAME } from '@/constants/product';
import SaleRate from '@/components/common/SaleRate';
import { useRecoilState } from 'recoil';
import { selectProductAtom } from '@/recoil/product';
import { priceComma } from '@/utils';
import Icon from '@/icons/Icon';

export default function ProductForm() {
  const [isVisibleOption, setIsVisibleOption] = React.useState(false);
  const [selectProductAtomState, setSelectProductAtomState] = useRecoilState(selectProductAtom);
  const { selectedDuration, durations } = selectProductAtomState;

  const onChangeDuration = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    if (!durations) {
      return;
    }

    const targetDuration = durations.find((duration) => duration.id === selectedValue);

    if (!targetDuration) {
      return;
    }

    setSelectProductAtomState((prev) => ({
      ...prev,
      selectedOptions: [],
      selectedDuration: targetDuration,
    }));
  };

  return (
    <S.ProductForm>
      <S.ProductInfo>
        <h6 className="title">{RECRUITMENT_PRODUCT_NAME[selectProductAtomState.name as keyof typeof RECRUITMENT_PRODUCT_NAME]}공고</h6>
      </S.ProductInfo>

      <S.PriceInfo>
        <div className="duration-box">
          <div className="duration-box__text">
            <span className="duration-box__text--label">이용기간</span>
            <span>{selectProductAtomState.selectedDuration.duration}일</span>
            <span>+{selectProductAtomState.selectedDuration.bonusDays}일</span>
          </div>

          <StyledChangeButton onClick={() => setIsVisibleOption((prev) => !prev)}>옵션변경</StyledChangeButton>
        </div>

        <div className="price-box">
          <div className="price-box__discount">
            {selectedDuration.discountRate !== 0 && <SaleRate rate={(selectedDuration.discountRate || 0) * 100} fontSize="14px" />}
            {selectedDuration.discountRate !== 0 && <del>{priceComma(selectedDuration.price)}원</del>}
          </div>

          {/* 할인있음 */}
          {selectedDuration.price && selectedDuration.discountRate !== 0 && (
            <strong className="price-box__sale-price">
              {priceComma(selectedDuration.price * (1 - (selectedDuration.discountRate || 0)))}원
            </strong>
          )}

          {/* 할인없음 */}
          {selectedDuration.price && selectedDuration.discountRate === 0 && (
            <strong className="price-box__sale-price">{priceComma(selectedDuration.price)}원</strong>
          )}
        </div>
      </S.PriceInfo>

      {isVisibleOption && durations && (
        <StyledDropDown>
          <h6 className="title">
            {RECRUITMENT_PRODUCT_NAME[selectProductAtomState.name as keyof typeof RECRUITMENT_PRODUCT_NAME]}공고 기간 변경
          </h6>
          <S.DurationSelect>
            <select onChange={onChangeDuration} defaultValue={selectedDuration.id}>
              {durations.map((duration) => (
                <option value={duration.id} key={duration.id}>
                  <span>{duration.duration}일</span>
                  {duration.bonusDays !== 0 && <span>&nbsp;+&nbsp;{`(${duration.bonusDays}일)`}</span>}
                </option>
              ))}
            </select>
            <Icon className="icon" name="ArrowBottom14x14" width="16px" height="16px" />
          </S.DurationSelect>
        </StyledDropDown>
      )}
    </S.ProductForm>
  );
}

const StyledChangeButton = styled.button`
  background-color: ${(props) => props.theme.colors.gray600};
  color: white;
  padding: 3px 8px;
  border-radius: 15px;
  font-weight: 300;
  font-size: 14px;
  cursor: pointer;
`;

const StyledDropDown = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
  .title {
    margin-bottom: 5px;
    font-size: 14px;
  }
`;

const S = {
  ProductForm: styled.div`
    padding: 15px 0;
  `,
  ProductInfo: styled.div`
    display: flex;
    .title {
      font-size: 16px;
      font-weight: 500;
    }
  `,
  PriceInfo: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 33px;
    .duration-box {
      display: flex;
      align-items: center;
      &__text {
        font-size: 16px;
        margin-right: 10px;
        &--label {
          color: ${(props) => props.theme.colors.gray600};
          padding-right: 5px;
        }
      }
    }
    .price-box {
      display: flex;
      flex-direction: column;
      align-items: end;
      &__discount {
        font-size: 14px;
      }
      &__sale-price {
        font-size: 16px;
        font-weight: 500;
      }
    }
  `,
  DurationSelect: styled.div`
    height: 40px;
    border-radius: 5px;
    max-width: 190px;
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
