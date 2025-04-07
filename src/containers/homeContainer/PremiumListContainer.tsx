import React from 'react';
import RecruitSectionTitle from '@/components/home/RecruitSectionTitle';
import RecruitPremiumList from '@/components/home/premium/RecruitPremiumList';
import RecruitPremiumCard from '@/components/home/premium/RecruitPremiumCard';
import InfiniteScroll from 'react-infinite-scroller';
import queryKeys from '@/constants/queryKeys';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { Get } from '@/apis';

const PREMIUM_LIMIT = '9';

export default function PremiumListContainer() {
  const { data, isLoading, isSuccess, fetchNextPage, hasNextPage, isFetching } = useInfiniteScroll({
    queryFn: Get.getRecruitPremiumList,
    queryKey: [queryKeys.MAIN_PREMIUM_LIST, { type: 'MAIN' }],
    options: {
      enabled: true,
      throwOnError: true,
      staleTime: 60 * 1000 * 5,
      gcTime: 60 * 1000 * 10,
    },
    requestQuery: {
      limit: PREMIUM_LIMIT,
      type: 'MAIN',
    },
  });

  console.log('프리미엄 채용 리스트 API : ', data);

  if (isSuccess && data) {
    return (
      <>
        <RecruitSectionTitle title="🌟 프리미엄 채용" />

        <InfiniteScroll
          loadMore={() => {
            fetchNextPage();
          }}
          hasMore={hasNextPage && !isFetching}
          threshold={450}
        >
          <RecruitPremiumList>
            {data.pages.map((page) => {
              return page.result.items.map((item) => <RecruitPremiumCard key={item.id} item={item} />);
            })}
          </RecruitPremiumList>
        </InfiniteScroll>
      </>
    );
  }
}
