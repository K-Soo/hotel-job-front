import React from 'react';
import RecruitUrgentCard from '@/components/recruit/RecruitUrgentCard';
import RecruitUrgentList from '@/components/recruit/RecruitUrgentList';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { Get } from '@/apis';
import InfiniteScroll from 'react-infinite-scroller';
import queryKeys from '@/constants/queryKeys';
import Button from '@/components/common/style/Button';
import RecruitSectionTitle from '@/components/recruit/RecruitSectionTitle';

export default function RecruitUrgentListContainer() {
  const { data, isLoading, isSuccess, fetchNextPage, hasNextPage, isFetching } = useInfiniteScroll({
    queryFn: Get.getRecruitUrgentList,
    queryKey: [queryKeys.RECRUIT_URGENT_LIST, { limit: '12' }],
    options: {
      throwOnError: true,
      staleTime: 60 * 1000 * 5,
      gcTime: 60 * 1000 * 10,
    },
    requestQuery: {
      limit: '12',
    },
  });

  console.log('급구 채용 리스트 API : ', data);

  const isFirstPage = data?.pages[data.pages.length - 1].result.pagination.currentPage === 1;

  if (isLoading) {
    return <div>loading</div>;
  }

  if (isSuccess && data) {
    return (
      <>
        <RecruitSectionTitle title="🔥 급구채용" />
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
          {isFirstPage && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button label="더보기" variant="primary" width="200px" onClick={() => fetchNextPage()} />
            </div>
          )}
        </InfiniteScroll>
      </>
    );
  }
}
