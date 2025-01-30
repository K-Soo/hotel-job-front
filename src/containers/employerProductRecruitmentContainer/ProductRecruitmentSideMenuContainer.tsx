import React from 'react';
import ProductRecruitmentSideMenu from '@/components/employerProductRecruitment/productRecruitmentSideMenu';
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { recruitmentProductSideMenuAtom } from '@/recoil/product';
import { selectProductAtom, durationCalcOptionsSelector } from '@/recoil/product';

export default function ProductRecruitmentSideMenuContainer() {
  const setRecruitmentProductSideMenuAtom = useSetRecoilState(recruitmentProductSideMenuAtom);
  const resetSelectProductAtomState = useResetRecoilState(selectProductAtom);
  const resetRecruitmentProductSideMenuAtom = useResetRecoilState(recruitmentProductSideMenuAtom);

  const handleCloseSideMenu = () => {
    setRecruitmentProductSideMenuAtom({ isOpen: false });
    resetRecruitmentProductSideMenuAtom();
    resetSelectProductAtomState();
  };

  return <ProductRecruitmentSideMenu handleCloseSideMenu={handleCloseSideMenu} />;
}
