import React from 'react';
import RecruitDesktopCard from '@/components/recruit/RecruitDesktopCard';
import useResponsive from '@/hooks/useResponsive';
import useFetchQuery from '@/hooks/useFetchQuery';
import { Get } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import PaginationComponent from '@/components/common/PaginationComponent';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { keepPreviousData } from '@tanstack/react-query';
import RecruitSectionTitle from '@/components/home/RecruitSectionTitle';
import SkeletonUI from '@/components/common/SkeletonUI';
import EmptyComponent from '@/components/common/EmptyComponent';
import RecruitMobileCard from '@/components/recruit/RecruitMobileCard';

interface Query extends ParsedUrlQuery {
  page?: string;
  job?: any;
}

const LIMIT = '20';

export default function RecruitBasicPaginateContainer() {
  const { isTablet } = useResponsive();

  const router = useRouter();
  const { page = '1', location, job } = router.query as Query;

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryFn: Get.getRecruitBasicList,
    queryKey: [queryKeys.RECRUIT_BASIC_LIST, { limit: LIMIT, page, job }],
    options: {
      staleTime: 60 * 1000 * 5,
      gcTime: 60 * 1000 * 10,
      throwOnError: true,
      placeholderData: keepPreviousData,
    },
    requestQuery: {
      page,
      limit: LIMIT,
      job,
    },
  });

  console.log('일반 리스트 API : ', data);

  if (isLoading) {
    return (
      <div className="mx-[15px] lg:mx-0">
        <SkeletonUI.Line style={{ height: '24px', width: '147px', marginBottom: '20px' }} />
        <SkeletonUI.RecruitBasicList count={2} />
      </div>
    );
  }

  if (isSuccess && data) {
    const isEmpty = data.result.pagination.totalItems === 0;

    if (isEmpty) {
      return (
        <>
          <RecruitSectionTitle title="채용공고" />
          <div className="mx-[15px] lg:mx-0">
            <EmptyComponent height="200px" message="해당하는 공고가 없어요." />
          </div>
        </>
      );
    }

    return (
      <>
        <RecruitSectionTitle title="채용공고" count={data.result.pagination.totalItems} />

        <div className="mx-[15px] lg:mx-0">
          {data.result.items.map((item, index) => {
            if (isTablet) {
              return <RecruitMobileCard key={index} item={item} />;
            }
            return <RecruitDesktopCard key={index} item={item} />;
          })}

          {!isEmpty && <PaginationComponent pagination={data.result.pagination} margin="20px 0 50px 0" />}
        </div>
      </>
    );
  }
}
