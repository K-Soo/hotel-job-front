import React from 'react';
import ProductRecruitmentSideMenu from '@/components/employerProductRecruitment/productRecruitmentSideMenu';
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { selectProductAtom, durationCalcOptionsSelector } from '@/recoil/product';

interface ProductRecruitmentSideMenuContainerProps {
  setIsOpenSideMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProductRecruitmentSideMenuContainer({ setIsOpenSideMenu }: ProductRecruitmentSideMenuContainerProps) {
  const resetSelectProductAtomState = useResetRecoilState(selectProductAtom);

  const handleCloseSideMenu = () => {
    setIsOpenSideMenu(false);
    resetSelectProductAtomState();
  };

  return <ProductRecruitmentSideMenu handleCloseSideMenu={handleCloseSideMenu} />;
}
