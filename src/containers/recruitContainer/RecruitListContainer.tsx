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

interface Query extends ParsedUrlQuery {
  page?: string;
}

// TODO - LOADING
export default function RecruitListContainer() {
  const { isTablet } = useResponsive();

  const router = useRouter();
  const { page = '1' } = router.query as Query;

  const { data, isLoading, isSuccess, isFetching } = useFetchQuery({
    queryFn: Get.getRecruitBasicList,
    queryKey: [queryKeys.RECRUIT_BASIC_LIST, { limit: '20', page }],
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
    },
  });

  console.log('채용 일반 리스트 API : ', data);

  const isEmpty = isSuccess && data && data.result.items.length === 0;

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isSuccess && data) {
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
        <RecruitSectionTitle title="일반채용" count={data.result.pagination.totalItems} />
        {data.result.items.map((item, index) => {
          if (isTablet) {
            return <RecruitMobileCard key={index} item={item} />;
          }
          return <RecruitDesktopCard recruitType="NORMAL" key={index} item={item} />;
        })}
        {!isEmpty && <PaginationComponent pagination={data.result.pagination} />}
      </>
    );
  }
}
