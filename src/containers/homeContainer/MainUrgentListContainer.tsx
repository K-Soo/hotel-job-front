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

export default function MainUrgentListContainer() {
  const { data, isLoading, isSuccess, fetchNextPage, hasNextPage, isFetching } = useInfiniteScroll({
    queryFn: Get.getRecruitUrgentList,
    queryKey: [queryKeys.RECRUIT_URGENT_LIST, { limit: '12', type: 'MAIN' }],
    options: {
      throwOnError: true,
      staleTime: 60 * 1000 * 5,
      gcTime: 60 * 1000 * 10,
    },
    requestQuery: {
      limit: '12',
      type: 'MAIN',
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
    const isEmptyFirstPage = isFirstPage && data?.pages[0]?.result.items.length === 0;

    return (
      <>
        <RecruitSectionTitle title="급구채용" />
        {isEmptyFirstPage && isFirstPage && <EmptyComponent height="200px" message="등록된 공고가 없어요." />}

        <InfiniteScroll
          loadMore={() => {
            fetchNextPage();
          }}
          hasMore={hasNextPage && !isFetching}
          threshold={450}
        >
          <RecruitUrgentList>
            {data.pages.map((page) => {
              return page.result.items.map((item) => <RecruitUrgentCard key={item.id} item={item} />);
            })}
          </RecruitUrgentList>
        </InfiniteScroll>
      </>
    );
  }
}
