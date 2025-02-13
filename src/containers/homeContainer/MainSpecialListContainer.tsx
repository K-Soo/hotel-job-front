import React from 'react';
import RecruitSpecialList from '@/components/recruit/RecruitSpecialList';
import RecruitSpecialCard from '@/components/recruit/RecruitSpecialCard';
import RecruitSectionTitle from '@/components/recruit/RecruitSectionTitle';
import InfiniteScroll from 'react-infinite-scroller';
import queryKeys from '@/constants/queryKeys';
import Button from '@/components/common/style/Button';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { Get } from '@/apis';
import EmptyComponent from '@/components/common/EmptyComponent';
import SkeletonUI from '@/components/common/SkeletonUI';

export default function MainSpecialListContainer() {
  const { data, isLoading, isSuccess, fetchNextPage, hasNextPage, isFetching } = useInfiniteScroll({
    queryFn: Get.getRecruitSpecialList,
    queryKey: [queryKeys.RECRUIT_SPECIAL_LIST, { limit: '9', type: 'MAIN' }],
    options: {
      enabled: true,
      throwOnError: true,
      staleTime: 60 * 1000 * 5,
      gcTime: 60 * 1000 * 10,
    },
    requestQuery: {
      limit: '9',
      type: 'MAIN',
    },
  });

  console.log('스페셜 채용 리스트 API : ', data);

  const isFirstPage = data?.pages[data.pages.length - 1].result.pagination.currentPage === 1;

  // 페이지 1에서 데이터가 없는지 확인
  const isEmptyFirstPage = isFirstPage && data?.pages[0]?.result.items.length === 0;

  if (isLoading) {
    return (
      <>
        <SkeletonUI.Line style={{ height: '24px', width: '147px', marginBottom: '10px' }} />
        <SkeletonUI.RecruitSpecialList count={3} />
      </>
    );
  }

  if (isSuccess && data) {
    return (
      <>
        <RecruitSectionTitle title="🌟 스페셜 채용" />

        {isEmptyFirstPage && isFirstPage && <EmptyComponent height="200px" message="등록된 공고가 없어요." />}

        <InfiniteScroll
          loadMore={() => {
            fetchNextPage();
          }}
          hasMore={hasNextPage && !isFetching}
          threshold={450}
        >
          <RecruitSpecialList>
            {data.pages.map((page) => {
              return page.result.items.map((item) => <RecruitSpecialCard key={item.id} item={item} />);
            })}
          </RecruitSpecialList>
        </InfiniteScroll>
      </>
    );
  }
}
