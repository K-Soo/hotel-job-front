import React from 'react';
import RecruitMobileCard from '@/components/recruit/RecruitMobileCard';
import { Get } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import { ParsedUrlQuery } from 'querystring';
import { keepPreviousData } from '@tanstack/react-query';
import RecruitSectionTitle from '@/components/recruit/RecruitSectionTitle';
import SkeletonUI from '@/components/common/SkeletonUI';
import EmptyComponent from '@/components/common/EmptyComponent';
import styled from 'styled-components';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useRouter } from 'next/router';
import BasicItemWrapper from '@/components/recruit/recruitBasic/BasicItemWrapper';
import PaginationTag from '@/components/common/PaginationTag';
import PaginationProgress from '@/components/common/PaginationProgress';
import useResponsive from '@/hooks/useResponsive';

interface Query extends ParsedUrlQuery {
  page?: string;
  job?: any;
}

const BASIC_LIST_LIMIT = '5';

export default function RecruitBasicMobileContainer() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const carouselRef = React.useRef<HTMLDivElement>(null);
  const carouselItemRef = React.useRef<HTMLDivElement[] | null[]>([]);

  const router = useRouter();

  const { page = '1', location, job } = router.query as Query;
  const { isTablet } = useResponsive();

  const { data, isLoading, isSuccess, fetchNextPage, hasNextPage, hasPreviousPage, isFetchingNextPage } = useInfiniteScroll({
    queryFn: Get.getRecruitBasicList,
    queryKey: [queryKeys.RECRUIT_BASIC_LIST, { limit: BASIC_LIST_LIMIT, type: 'RECRUIT', page, job }],
    options: {
      enabled: isTablet,
      throwOnError: true,
      staleTime: 60 * 1000 * 5,
      gcTime: 60 * 1000 * 10,
      placeholderData: keepPreviousData,
    },
    requestQuery: {
      limit: BASIC_LIST_LIMIT,
      type: 'RECRUIT',
      job,
    },
  });

  React.useEffect(() => {
    if (!data) return;

    const currentPage = data.pages.at(-1)?.result.pagination.currentPage;
    const nextPage = data?.pages.at(-1)?.result.pagination.nextPage;

    if (currentPage === 1 && nextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, hasNextPage, job, page]);

  console.log('일반 리스트 API : ', data);

  if (isLoading) {
    return (
      <>
        <SkeletonUI.Line style={{ height: '24px', width: '147px', marginBottom: '20px' }} />
        <SkeletonUI.RecruitBasicList count={2} />
      </>
    );
  }

  if (isSuccess && data) {
    const isEmpty = data.pages[0]?.result.pagination.totalItems === 0;

    return (
      <div className="mb-[100px]">
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 15px 20px 0' }}>
          <RecruitSectionTitle title="일반 채용" count={data.pages[0].result.pagination.totalItems} margin="0" />
          <PaginationTag currentPage={currentIndex + 1} totalPages={data.pages[0].result.pagination.totalPages} />
        </div>

        {isEmpty && <EmptyComponent height="150px" message="해당하는 공고가 없어요." isVisibleImage={false} />}

        <StyledCarouselContainer ref={carouselRef}>
          {data.pages.map((page, pageIndex) => {
            return (
              <BasicItemWrapper
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
                  return <RecruitMobileCard key={index} item={item} />;
                })}
              </BasicItemWrapper>
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
