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
import RecruitSectionTitle from '@/components/recruit/RecruitSectionTitle';
import RecruitPc from '@/components/recruit/recruitBasic/RecruitPc';
import SkeletonUI from '@/components/common/SkeletonUI';
import EmptyComponent from '@/components/common/EmptyComponent';

interface Query extends ParsedUrlQuery {
  page?: string;
  job?: any;
}

const BASIC_LIST_LIMIT = '20';

export default function RecruitBasicPcContainer() {
  const { isTablet } = useResponsive();

  const router = useRouter();
  const { page = '1', location, job } = router.query as Query;

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryFn: Get.getRecruitBasicList,
    queryKey: [queryKeys.RECRUIT_BASIC_LIST, { limit: BASIC_LIST_LIMIT, type: 'RECRUIT', page, job }],
    options: {
      enabled: !isTablet,
      staleTime: 60 * 1000 * 5,
      gcTime: 60 * 1000 * 10,
      throwOnError: true,
      placeholderData: keepPreviousData,
    },
    requestQuery: {
      page,
      limit: BASIC_LIST_LIMIT,
      type: 'RECRUIT',
      job,
    },
  });

  console.log('일반 리스트 API : ', data);

  if (isLoading) {
    return (
      <RecruitPc>
        <SkeletonUI.Line style={{ height: '24px', width: '147px', marginBottom: '20px' }} />
        <SkeletonUI.RecruitBasicList count={2} />
      </RecruitPc>
    );
  }

  if (isSuccess && data) {
    const isEmpty = data.result.pagination.totalItems === 0;

    if (isEmpty) {
      return (
        <>
          <RecruitSectionTitle title="일반채용" />
          <RecruitPc>
            <EmptyComponent height="200px" message="해당하는 공고가 없어요." />
          </RecruitPc>
        </>
      );
    }

    return (
      <>
        <RecruitSectionTitle title="일반채용" count={data.result.pagination.totalItems} />

        <RecruitPc>
          {data.result.items.map((item, index) => {
            return <RecruitDesktopCard key={index} item={item} />;
          })}

          {!isEmpty && <PaginationComponent pagination={data.result.pagination} margin="20px 0 50px 0" />}
        </RecruitPc>
      </>
    );
  }
}
