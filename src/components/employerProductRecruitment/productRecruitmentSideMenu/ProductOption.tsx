import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import Icon from '@/icons/Icon';
import CheckBox from '@/components/common/style/CheckBox';
import Tag from '@/components/common/Tag';
import SaleRate from '@/components/common/SaleRate';
import { selectProductAtom } from '@/recoil/product';
import { RECRUITMENT_PRODUCT_OPTIONS_DESCRIPTION, RECRUITMENT_PRODUCT_OPTION_NAME } from '@/constants/product';
import { ProductDuration, RecruitmentProductOptionNameKey } from '@/types';
import { priceComma } from '@/utils';

interface ProductOptionProps {
  option: {
    optionDurations: ProductDuration[];
    id: string;
    listUpIntervalHours: number;
    maxListUpPerDay: number;
    name: RecruitmentProductOptionNameKey;
    tags: [];
  };
}

export default function ProductOption({ option }: ProductOptionProps) {
  const [selectedDuration, setSelectedDuration] = React.useState(option.optionDurations[0]);

  const [selectProductAtomState, setSelectProductAtom] = useRecoilState(selectProductAtom);

  const isCheck = selectProductAtomState.selectedOptions.some((selectedOption) => selectedOption.id === option.id);

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    const { optionDurations, ...rest } = option;

    if (checked) {
      const checkedOptionData = {
        ...rest,
        selectedOptionDuration: {
          ...selectedDuration,
        },
      };
      setSelectProductAtom((prev) => ({
        ...prev,
        selectedOptions: [...prev.selectedOptions, checkedOptionData],
      }));
      return;
    }

    setSelectProductAtom((prev) => ({
      ...prev,
      selectedOptions: prev.selectedOptions.filter((selectedOption) => selectedOption.id !== option.id),
    }));
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const targetValue = event.target.value;

    const existingDuration = option.optionDurations.find((duration) => duration.id === targetValue);

    if (!existingDuration) {
      return;
    }

    setSelectedDuration(existingDuration);

    setSelectProductAtom((prev) => {
      const isOptionSelected = prev.selectedOptions.some((selectedOption) => selectedOption.id === option.id);

      if (isOptionSelected) {
        return {
          ...prev,
          selectedOptions: prev.selectedOptions.map((selectedOption) =>
            selectedOption.id === option.id ? { ...selectedOption, selectedOptionDuration: existingDuration } : selectedOption,
          ),
        };
      }

      return prev;
    });
  };

  return (
    <S.ProductOption>
      <div className="option-header">
        <div className="option-header__title">
          <CheckBox checked={isCheck} onChange={handleChangeCheckbox} name={option.id} />
          <span className="option-header__title--text">{RECRUITMENT_PRODUCT_OPTION_NAME[option.name]}</span>
        </div>
        <div className="option-header__tags">
          <Tag label="PC+M" margin="0 0 0 7px" />
          {option.name === 'LIST_UP' && <Tag label="BEST" margin="0 0 0 7px" type="BEST" />}
        </div>
      </div>

      {RECRUITMENT_PRODUCT_OPTIONS_DESCRIPTION[option.name] && (
        <p className="guide">{RECRUITMENT_PRODUCT_OPTIONS_DESCRIPTION[option.name]}</p>
      )}

      {option.name === 'LIST_UP' && (
        <p className="guide">
          24시간동안 {option.maxListUpPerDay}번({option.listUpIntervalHours}시간 간격) 공고를 최상단으로!
        </p>
      )}

      <div className="option-content">
        <S.DurationSelect>
          <select onChange={handleChangeSelect}>
            {option.optionDurations.map((duration) => (
              <option key={duration.id} value={duration.id}>
                <span>{duration.duration}일</span>
                {duration.bonusDays !== 0 && <span>&nbsp;+&nbsp;{`(${duration?.bonusDays}일)`}</span>}
              </option>
            ))}
          </select>
          <Icon className="icon" name="ArrowBottom14x14" width="16px" height="16px" />
        </S.DurationSelect>

        <S.PriceBox>
          <div>
            {selectedDuration.discountRate !== 0 && <SaleRate rate={selectedDuration.discountRate * 100} fontSize="14px" />}
            {selectedDuration.discountRate !== 0 && <del>{priceComma(selectedDuration.price)}원</del>}
          </div>
          <strong className="sale-price">{priceComma(selectedDuration.price * (1 - selectedDuration.discountRate))}원</strong>
        </S.PriceBox>
      </div>
    </S.ProductOption>
  );
}

const S = {
  ProductOption: styled.div`
    padding: 10px 0;
    margin: 10px 0;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
    .option-header {
      display: flex;
      align-items: center;
      &__title {
        display: flex;
        align-items: center;
        margin-right: 10px;
        &--text {
          font-size: 16px;
        }
      }
      &__tags {
        display: flex;
        align-items: center;
      }
    }
    .guide {
      font-size: 14px;
      color: ${(props) => props.theme.colors.gray800};
      margin: 8px 0;
    }
    .option-content {
      margin-top: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  `,
  PriceBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: ${(props) => props.theme.colors.gray600};
    font-weight: 300;
    .sale-price {
      color: ${(props) => props.theme.colors.black400};
      font-size: 16px;
      font-weight: 500;
    }
  `,
  DurationSelect: styled.div`
    display: flex;
    align-items: center;
    width: 140px;
    height: 35px;
    cursor: pointer;
    position: relative;
    select {
      display: flex;
      align-items: center;
      padding-left: 10px;
      border-radius: 5px;
      border: 1px solid ${(props) => props.theme.colors.gray300};
      height: 100%;
      width: 100%;
    }
    .icon {
      position: absolute;
      pointer-events: none;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      right: 15px;
      position: absolute;
      color: ${(props) => props.theme.colors.black600};
    }
  `,
};
