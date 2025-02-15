import React from 'react';
import RecruitUrgentCard from '@/components/recruit/RecruitUrgentCard';
import RecruitUrgentList from '@/components/recruit/RecruitUrgentList';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { Get } from '@/apis';
import InfiniteScroll from 'react-infinite-scroller';
import queryKeys from '@/constants/queryKeys';
import Button from '@/components/common/style/Button';
import RecruitSectionTitle from '@/components/recruit/RecruitSectionTitle';
import EmptyComponent from '@/components/common/EmptyComponent';
import SkeletonUI from '@/components/common/SkeletonUI';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { keepPreviousData } from '@tanstack/react-query';

interface Query extends ParsedUrlQuery {
  page?: string;
  job?: any;
}

export default function RecruitUrgentListContainer() {
  const router = useRouter();
  const { page = '1', location, job } = router.query as Query;

  const { data, isLoading, isSuccess, fetchNextPage, hasNextPage, isFetching } = useInfiniteScroll({
    queryFn: Get.getRecruitUrgentList,
    queryKey: [queryKeys.RECRUIT_URGENT_LIST, { limit: '12', type: 'RECRUIT', job }],
    options: {
      throwOnError: true,
      staleTime: 60 * 1000 * 5,
      gcTime: 60 * 1000 * 10,
      placeholderData: keepPreviousData,
    },
    requestQuery: {
      limit: '12',
      type: 'RECRUIT',
      job,
    },
  });

  console.log('급구 채용 리스트 API : ', data);

  if (isLoading) {
    return (
      <>
        <SkeletonUI.Line style={{ height: '24px', width: '147px', marginBottom: '15px' }} />
        <SkeletonUI.RecruitUrgentList count={4} />
      </>
    );
  }

  if (isSuccess && data) {
    // 페이지 1에서 데이터가 없는지 확인

    const isFirstPage = data?.pages[data.pages.length - 1].result.pagination.currentPage === 1;
    const nextPage = data?.pages[data.pages.length - 1].result.pagination.nextPage;
    const isEmptyFirstPage = isFirstPage && data?.pages[0]?.result.items.length === 0;

    return (
      <>
        <RecruitSectionTitle title="급구채용" />
        {isEmptyFirstPage && isFirstPage && <EmptyComponent height="150px" message="해당하는 공고가 없어요." isVisibleImage={false} />}

        <InfiniteScroll
          loadMore={() => {
            if (!isFirstPage) {
              fetchNextPage();
            }
          }}
          hasMore={hasNextPage && !isFetching}
          threshold={450}
        >
          <RecruitUrgentList>
            {data.pages.map((page) => {
              return page.result.items.map((item) => <RecruitUrgentCard key={item.id} item={item} />);
            })}
          </RecruitUrgentList>
          {!isEmptyFirstPage && isFirstPage && nextPage && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button label="더보기" variant="tertiary" width="200px" onClick={() => fetchNextPage()} margin="0 0 30px 0" />
            </div>
          )}
        </InfiniteScroll>
      </>
    );
  }
}
