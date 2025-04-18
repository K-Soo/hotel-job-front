import React from 'react';
import RecruitSectionTitle from '@/components/home/RecruitSectionTitle';
import CarouselItem from '@/components/recruit/CarouselItem';
import queryKeys from '@/constants/queryKeys';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { Get } from '@/apis';
import EmptyComponent from '@/components/common/EmptyComponent';
import SkeletonUI from '@/components/common/SkeletonUI';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { keepPreviousData } from '@tanstack/react-query';
import PaginationProgress from '@/components/common/PaginationProgress';
import PaginationTag from '@/components/common/PaginationTag';
import PremiumCarouselCard from '@/components/home/premium/PremiumCarouselCard';
import styled from 'styled-components';

interface Query extends ParsedUrlQuery {
  page?: string;
  job?: any;
}

const LIMIT = '4';

export default function RecruitPremiumCarouselContainer() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const carouselRef = React.useRef<HTMLDivElement>(null);
  const carouselItemRef = React.useRef<HTMLDivElement[] | null[]>([]);

  const router = useRouter();

  const { job } = router.query as Query;

  const { data, isLoading, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteScroll({
    queryFn: Get.getRecruitPremiumList,
    queryKey: [queryKeys.RECRUIT_PREMIUM_LIST, { limit: LIMIT, job }],
    options: {
      enabled: true,
      throwOnError: true,
      staleTime: 60 * 1000 * 5,
      gcTime: 60 * 1000 * 10,
      placeholderData: keepPreviousData,
    },
    requestQuery: {
      limit: LIMIT,
      job,
    },
  });

  console.log('프리미엄 채용 모바일 API : ', data);

  React.useEffect(() => {
    if (!data) return;

    const currentPage = data.pages.at(-1)?.result.pagination.currentPage;
    const nextPage = data?.pages.at(-1)?.result.pagination.nextPage;

    if (currentPage === 1 && nextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, hasNextPage, job]);

  if (isLoading) {
    return (
      <div className="px-[15px]">
        <SkeletonUI.Line style={{ height: '24px', width: '147px', marginBottom: '20px' }} />
        <SkeletonUI.RecruitSpecialList count={2} />
      </div>
    );
  }

  if (isSuccess && data) {
    const isEmpty = data.pages[0]?.result.pagination.totalItems === 0;

    return (
      <div className="mb-[100px]">
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 15px 20px 0' }}>
          <RecruitSectionTitle title="프리미엄 TOP" margin="0" />
          <PaginationTag currentPage={currentIndex + 1} totalPages={data.pages[0].result.pagination.totalPages} />
        </div>

        {isEmpty && <EmptyComponent height="150px" message="해당하는 공고가 없어요." isVisibleImage={false} />}

        <StyledCarouselContainer ref={carouselRef}>
          {data.pages.map((page, pageIndex) => {
            return (
              <CarouselItem
                key={pageIndex}
                ref={(el: HTMLDivElement | null) => {
                  carouselItemRef.current[pageIndex] = el;
                }}
                index={pageIndex}
                setCurrentIndex={setCurrentIndex}
                onInView={(index) => {
                  if (index === data.pages.length - 1 && !isFetchingNextPage) {
                    fetchNextPage();
                  }
                }}
              >
                {page.result.items.map((item, index) => {
                  return <PremiumCarouselCard key={item.id} item={item} index={index} />;
                })}
              </CarouselItem>
            );
          })}
        </StyledCarouselContainer>

        {!isEmpty && <PaginationProgress currentPage={currentIndex + 1} totalPages={data.pages[0].result.pagination.totalPages} />}
      </div>
    );
  }
}

const StyledCarouselContainer = styled.section`
  display: flex;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  overflow: auto hidden;
  gap: 8px;
  padding: 0 15px;
  scroll-padding: 0 15px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
