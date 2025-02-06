import { atom, selector } from 'recoil';
import { ProductDuration, ProductRecruitmentListItem, RecruitmentProductNameKey, RecruitmentProductOptionNameKey } from '@/types';

interface RecruitmentProductSideMenuAtom {
  isOpen: boolean;
}

interface ProductFocusAtom {
  product: RecruitmentProductNameKey | 'DEFAULT' | undefined;
}

interface SelectProductAtom extends Partial<ProductRecruitmentListItem> {
  selectedOptions: {
    id: string;
    listUpIntervalHours: number;
    maxListUpPerDay: number;
    name: RecruitmentProductOptionNameKey;
    tags: [];
    selectedOptionDuration: ProductDuration;
  }[];

  selectedDuration: Partial<ProductDuration>;
}

export const productFocusAtom = atom<ProductFocusAtom>({
  key: 'productFocusAtom',
  default: {
    product: 'DEFAULT',
  },
});

export const recruitmentProductSideMenuAtom = atom<RecruitmentProductSideMenuAtom>({
  key: 'recruitmentProductSideMenuAtom',
  default: {
    isOpen: false,
  },
});

export const selectRecruitmentIdAtom = atom<{ recruitmentId?: string }>({
  key: 'selectRecruitmentIdAtom',
  default: {
    recruitmentId: undefined,
  },
});

export const selectProductAtom = atom<SelectProductAtom>({
  key: 'selectProductAtom',
  default: {
    id: undefined,
    name: undefined,
    type: undefined,
    durations: [],
    options: [],

    selectedOptions: [],

    selectedDuration: {
      bonusDays: undefined,
      discountRate: undefined,
      duration: undefined,
      id: undefined,
      price: undefined,
    },
  },
});

// 선택된 공고의 기간에 대응하는 옵션날짜 계산
export const durationCalcOptionsSelector = selector({
  key: 'durationCalcOptionsSelector',
  get: ({ get }) => {
    const selectProductAtomState = get(selectProductAtom);
    const { selectedDuration, options } = selectProductAtomState;

    const duration = selectedDuration.duration;
    if (!duration) {
      throw new Error('duration is required');
    }
    const bonusDays = selectedDuration.bonusDays ?? 0;

    // 선택된 공고의 총 기간 계산
    const totalDuration = duration + bonusDays;

    // 옵션 리스트에서 totalDuration 이하의 옵션들만 필터링
    const filteredOptions = options?.map((option) => {
      // optionDurations 중 totalDuration 이하인 것들만 남김
      const filteredDurations = option.optionDurations.filter(
        (optionDuration) => optionDuration.duration && optionDuration.duration <= totalDuration,
      );

      return {
        ...option,
        optionDurations: filteredDurations,
      };
    });

    return filteredOptions;
  },
});

export const amountSelector = selector({
  key: 'totalAmountSelector',
  get: ({ get }) => {
    const selectProductAtomState = get(selectProductAtom);
    const { selectedDuration, selectedOptions } = selectProductAtomState;

    // 선택된 공고 상품의 금액
    const productPrice = selectedDuration?.price || 0;

    // 공고 상품의 할인 금액
    const productDiscountAmount = productPrice * (selectedDuration.discountRate || 0);

    // 선택된 옵션들의 총 금액
    const optionsPrice = selectedOptions.reduce((total, option) => {
      // 각 옵션의 selectedOptionDuration(price) 합산
      const optionPrice = option.selectedOptionDuration?.price || 0;
      return total + optionPrice;
    }, 0);

    // 옵션별 할인 금액 합산
    const optionsDiscountAmount = selectedOptions.reduce((total, option) => {
      const optionPrice = option.selectedOptionDuration?.price || 0;
      const optionDiscountRate = option.selectedOptionDuration?.discountRate || 0;

      return total + optionPrice * optionDiscountRate;
    }, 0);

    // 할인 전 총 금액
    const totalProductPrice = productPrice + optionsPrice;

    // 할인 된 총 금액
    const totalDiscountPrice = productDiscountAmount + optionsDiscountAmount;

    const totalPaymentAmount = totalProductPrice - totalDiscountPrice;

    return {
      totalProductPrice,
      totalDiscountPrice,
      totalPaymentAmount,
    };
  },
});
