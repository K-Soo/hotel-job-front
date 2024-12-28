import { atom } from 'recoil';

export interface PaymentAtom {
  isLoading: boolean;
}

export interface ProductOptionAsideMenuAtom {
  isOpen: boolean;
}

export const paymentAtom = atom<PaymentAtom>({
  key: 'paymentAtom',
  default: {
    isLoading: false,
  },
});

export const productOptionAsideMenuAtom = atom<ProductOptionAsideMenuAtom>({
  key: 'productOptionAsideMenuAtom',
  default: {
    isOpen: false,
  },
});
