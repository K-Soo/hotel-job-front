import React from 'react';
import useFetchQuery from '@/hooks/useFetchQuery';
import { Get } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import useAuth from '@/hooks/useAuth';
import EmployerCoupon from '@/components/employerCoupon';
import SkeletonUI from '@/components/common/SkeletonUI';
import SectionTitle from '@/components/common/employer/SectionTitle';
import CouponTab from '@/components/employerCoupon/CouponTab';
import CouponList from '@/components/employerCoupon/CouponList';
import EmptyComponent from '@/components/common/EmptyComponent';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { keepPreviousData } from '@tanstack/react-query';

export interface UrlQuery extends ParsedUrlQuery {
  use?: 'Y' | 'N';
}

export default function EmployerCouponContainer() {
  const { authAtomState } = useAuth();
  const router = useRouter();
  const { use = 'N' } = router.query as UrlQuery;

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.COUPON_LIST, { nickname: authAtomState.nickname, use }],
    queryFn: Get.getEmployerCouponList,
    options: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      placeholderData: keepPreviousData,
    },
    requestQuery: {
      use,
    },
  });

  console.log('쿠폰 리스트 API : ', data);

  if (isLoading) {
    return (
      <EmployerCoupon>
        <SectionTitle title="쿠폰" />
        <CouponTab />
        <SkeletonUI.Document />
      </EmployerCoupon>
    );
  }

  if (isSuccess && data) {
    const isEmpty = data.result.length === 0;

    return (
      <EmployerCoupon>
        <SectionTitle title="쿠폰" />
        <CouponTab />
        {isEmpty && <EmptyComponent message="사용가능한 쿠폰이 없습니다." />}
        {!isEmpty && <CouponList items={data.result} />}
      </EmployerCoupon>
    );
  }
}
