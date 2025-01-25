import { atom } from 'recoil';

export interface PaymentAtom {
  isLoading: boolean;
}

export const paymentAtom = atom<PaymentAtom>({
  key: 'paymentAtom',
  default: {
    isLoading: false,
  },
});
