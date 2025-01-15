import React from 'react';
import useResponsive from '@/hooks/useResponsive';
import RecruitSpecialList from '@/components/recruit/RecruitSpecialList';
import RecruitSpecialCard from '@/components/recruit/RecruitSpecialCard';
import RecruitSectionTitle from '@/components/recruit/RecruitSectionTitle';
import InfiniteScroll from 'react-infinite-scroller';
import queryKeys from '@/constants/queryKeys';
import Button from '@/components/common/style/Button';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { Get } from '@/apis';

export default function RecruitSpecialListContainer() {
  const recruitArray = Array.from({ length: 9 });
  const { isTablet } = useResponsive();

  const { data, isLoading, isSuccess, fetchNextPage, hasNextPage, isFetching } = useInfiniteScroll({
    queryFn: Get.getRecruitSpecialList,
    queryKey: [queryKeys.RECRUIT_SPECIAL_LIST, { limit: '9' }],
    options: {
      enabled: true,
      throwOnError: true,
      staleTime: 60 * 1000 * 5,
      gcTime: 60 * 1000 * 10,
    },
    requestQuery: {
      limit: '9',
    },
  });

  console.log('스페셜 채용 리스트 API : ', data);

  if (isLoading) {
    return <div>loading</div>;
  }

  const isFirstPage = data?.pages[data.pages.length - 1].result.pagination.currentPage === 1;

  if (isSuccess && data) {
    return (
      <>
        <RecruitSectionTitle title="🌟 스페셜 채용" />
        <InfiniteScroll
          loadMore={() => {
            if (!isFirstPage) {
              fetchNextPage();
            }
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
        {isFirstPage && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button label="더보기" variant="primary" width="200px" onClick={() => fetchNextPage()} />
          </div>
        )}
      </>
    );
  }
}
