import React from 'react';
import EmployerProductSection from '@/components/employerProductSection';
import EmployerQuickMenu from '@/components/common/employer/EmployerQuickMenu';
import ProductOptionAsideMenu from '@/components/common/employer/ProductOptionAsideMenu';
import { useRecoilValue } from 'recoil';
import { productOptionAsideMenuAtom } from '@/recoil/payment';

export default function EmployerProductSectionContainer() {
  const productOptionAsideMenuAtomValue = useRecoilValue(productOptionAsideMenuAtom);

  return (
    <>
      {productOptionAsideMenuAtomValue.isOpen && <ProductOptionAsideMenu />}
      <EmployerProductSection>
        <EmployerQuickMenu />
      </EmployerProductSection>
    </>
  );
}
