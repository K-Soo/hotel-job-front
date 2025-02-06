import React from 'react';
import EmployerProductRecruitment from '@/components/employerProductRecruitment';
import { useRecoilValue } from 'recoil';
import queryKeys from '@/constants/queryKeys';
import { Get } from '@/apis';
import useFetchQuery from '@/hooks/useFetchQuery';
import { ParsedUrlQuery } from 'querystring';
import { ProductRecruitmentQuery } from '@/types/API';
import { useRouter } from 'next/router';
import ProductCard from '@/components/employerProductRecruitment/ProductCard';
import { keepPreviousData } from '@tanstack/react-query';
import ProductRecruitmentSideMenuContainer from '@/containers/employerProductRecruitmentContainer/ProductRecruitmentSideMenuContainer';

interface Query extends ParsedUrlQuery {
  type?: ProductRecruitmentQuery;
}

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

  console.log('상품 리스트 API : ', data);

  return (
    <>
      {isOpenSideMenu && <ProductRecruitmentSideMenuContainer setIsOpenSideMenu={setIsOpenSideMenu} />}
      <EmployerProductRecruitment isLoading={isLoading}>
        {isSuccess &&
          data &&
          data.result.map((product) => <ProductCard key={product.id} product={product} setIsOpenSideMenu={setIsOpenSideMenu} />)}
      </EmployerProductRecruitment>
    </>
  );
}
