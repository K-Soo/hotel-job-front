import React from 'react';
import EmployerQuickMenu from '@/components/common/employer/EmployerQuickMenu';
import EmployerProductRecruitment from '@/components/employerProductRecruitment';
import ProductOptionAsideMenu from '@/components/common/employer/ProductOptionAsideMenu';
import { useRecoilValue } from 'recoil';
import { productOptionAsideMenuAtom } from '@/recoil/payment';

export default function EmployerProductRecruitmentContainer() {
  const productOptionAsideMenuAtomValue = useRecoilValue(productOptionAsideMenuAtom);

  return (
    <>
      {productOptionAsideMenuAtomValue.isOpen && <ProductOptionAsideMenu />}
      <EmployerProductRecruitment>
        <EmployerQuickMenu />
      </EmployerProductRecruitment>
    </>
  );
}
