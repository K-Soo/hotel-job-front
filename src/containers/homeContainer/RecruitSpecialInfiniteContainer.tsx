import React from 'react';
import RecruitSpecialCard from '@/components/home/special/RecruitSpecialCard';
import RecruitSectionTitle from '@/components/home/RecruitSectionTitle';
import InfiniteScroll from 'react-infinite-scroller';
import queryKeys from '@/constants/queryKeys';
import Button from '@/components/common/style/Button';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { Get } from '@/apis';
import EmptyComponent from '@/components/common/EmptyComponent';
import SkeletonUI from '@/components/common/SkeletonUI';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { keepPreviousData } from '@tanstack/react-query';

interface Query extends ParsedUrlQuery {
  job?: any;
}

const SPECIAL_LIMIT = '32';

export default function RecruitSpecialInfiniteContainer() {
  const router = useRouter();
  const { job } = router.query as Query;

  const { data, isLoading, isSuccess, fetchNextPage, hasNextPage, isFetching } = useInfiniteScroll({
    queryFn: Get.getRecruitSpecialList,
    queryKey: [queryKeys.RECRUIT_SPECIAL_LIST, { limit: SPECIAL_LIMIT, job }],
    options: {
      enabled: true,
      throwOnError: true,
      staleTime: 60 * 1000 * 5,
      gcTime: 60 * 1000 * 10,
      placeholderData: keepPreviousData,
    },
    requestQuery: {
      limit: SPECIAL_LIMIT,
      job,
    },
  });

  console.log('스페셜 채용 리스트 API : ', data);

  if (isLoading) {
    return (
      <>
        <SkeletonUI.Line style={{ height: '24px', width: '147px', marginBottom: '20px' }} />
        <SkeletonUI.RecruitSpecialList count={3} />
      </>
    );
  }

  if (isSuccess && data) {
    const isFirstPage = data?.pages.at(-1)?.result.pagination.currentPage === 1;
    const nextPage = data?.pages.at(-1)?.result.pagination.nextPage;
    const isEmptyFirstPage = isFirstPage && data?.pages[0]?.result.items.length === 0;

    return (
      <>
        <RecruitSectionTitle title="스페셜 채용" />

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
          <div className="mx-[15px] mt-0 mb-[100px] flex flex-wrap gap-[15px] lg:mx-0">
            {data.pages.map((page) => {
              return page.result.items.map((item, index) => <RecruitSpecialCard key={item.id} item={item} index={index} />);
            })}
          </div>
        </InfiniteScroll>

        {!isEmptyFirstPage && isFirstPage && nextPage && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              label="더보기"
              variant="tertiary"
              width="200px"
              onClick={() => fetchNextPage()}
              margin="0 0 30px 0"
              borderRadius="30px"
            />
          </div>
        )}
      </>
    );
  }
}
