import React from 'react';
import EmployerProductRecruitment from '@/components/employerProductRecruitment';
import queryKeys from '@/constants/queryKeys';
import { Get } from '@/apis';
import useFetchQuery from '@/hooks/useFetchQuery';
import { ParsedUrlQuery } from 'querystring';
import { ProductRecruitmentQuery } from '@/types/API';
import { useRouter } from 'next/router';
import ProductCard from '@/components/employerProductRecruitment/ProductCard';
import { keepPreviousData } from '@tanstack/react-query';
import ProductRecruitmentSideMenuContainer from '@/containers/employerProductRecruitmentContainer/ProductRecruitmentSideMenuContainer';
import SkeletonUI from '@/components/common/SkeletonUI';
import ProductRecruitmentTab from '@/components/employerProductRecruitment/ProductRecruitmentTab';

interface Query extends ParsedUrlQuery {
  type?: ProductRecruitmentQuery;
}

// TODO - 메인 프리미엄 상품
export default function EmployerProductRecruitmentContainer() {
  const [isOpenSideMenu, setIsOpenSideMenu] = React.useState(false);

  const router = useRouter();
  const { type = 'MAIN' } = router.query as Query;

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.PRODUCT_RECRUITMENT, { type }],
    queryFn: Get.getProductRecruitmentList,
    options: {
      throwOnError: true,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      placeholderData: keepPreviousData,
    },
    requestQuery: {
      type: type.toUpperCase() as ProductRecruitmentQuery,
    },
  });

  if (isLoading) {
    return (
      <section>
        <ProductRecruitmentTab />
        <div style={{ display: 'flex' }}>
          <SkeletonUI.RecruitMentProductPreview />
          <SkeletonUI.RecruitMentProductList />
        </div>
      </section>
    );
  }

  if (isSuccess && data) {
    return (
      <>
        {isOpenSideMenu && <ProductRecruitmentSideMenuContainer setIsOpenSideMenu={setIsOpenSideMenu} />}
        <EmployerProductRecruitment>
          {data.result.map((product) => {
            if (product.name === 'PREMIUM') return;
            return <ProductCard key={product.id} product={product} setIsOpenSideMenu={setIsOpenSideMenu} />;
          })}
        </EmployerProductRecruitment>
      </>
    );
  }
}
