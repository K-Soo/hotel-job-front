import React from 'react';
import RecruitDesktopCard from '@/components/recruit/RecruitDesktopCard';
import RecruitMobileCard from '@/components/recruit/RecruitMobileCard';
import useResponsive from '@/hooks/useResponsive';
import useFetchQuery from '@/hooks/useFetchQuery';
import { Get } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import PaginationComponent from '@/components/common/PaginationComponent';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { keepPreviousData } from '@tanstack/react-query';
import RecruitSectionTitle from '@/components/recruit/RecruitSectionTitle';
import Tabs from '@/components/common/Tabs';
import { recruitOrderFilterTabOptions } from '@/constants/tabs';
import SkeletonUI from '@/components/common/SkeletonUI';
import EmptyComponent from '@/components/common/EmptyComponent';
import { AllJobsKeyValuesKeys } from '@/constants/job';

interface Query extends ParsedUrlQuery {
  page?: string;
  job?: any;
}

export default function RecruitListContainer() {
  const { isTablet } = useResponsive();

  const router = useRouter();
  const { page = '1', location, job } = router.query as Query;

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryFn: Get.getRecruitBasicList,
    queryKey: [queryKeys.RECRUIT_BASIC_LIST, { limit: '20', type: 'BASIC', page, job }],
    options: {
      enabled: true,
      staleTime: 60 * 1000 * 5,
      gcTime: 60 * 1000 * 10,
      throwOnError: true,
      placeholderData: keepPreviousData,
    },
    requestQuery: {
      page,
      limit: '20',
      type: 'RECRUIT',
      job,
    },
  });

  console.log('일반 리스트 API : ', data);

  if (isLoading) {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '0' }}>
          <SkeletonUI.Line style={{ height: '35px', width: '180px' }} />
        </div>
        <SkeletonUI.Line style={{ height: '24px', width: '147px', marginBottom: '10px' }} />
        <SkeletonUI.RecruitBasicList count={2} />
      </>
    );
  }

  if (isSuccess && data) {
    const isEmpty = data.result.pagination.totalItems === 0;

    if (isEmpty) {
      return (
        <>
          <RecruitSectionTitle title="급구채용" />
          <EmptyComponent height="200px" message="등록된 공고가 없어요." />
        </>
      );
    }

    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '0' }}>
          <Tabs
            tabsOptions={recruitOrderFilterTabOptions}
            width="180px"
            height="35px"
            fontSize="13px"
            fontColor="gray"
            backgroundColor="#FFFFFF"
          />
        </div>
        <RecruitSectionTitle title="일반채용" count={data.result.pagination.totalItems} margin="0" />
        {data.result.items.map((item, index) => {
          if (isTablet) {
            return <RecruitMobileCard key={index} item={item} />;
          }

          return <RecruitDesktopCard key={index} item={item} />;
        })}
        {!isEmpty && <PaginationComponent pagination={data.result.pagination} />}
      </>
    );
  }
}
