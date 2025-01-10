import React from 'react';
import RecruitmentTable from '@/components/employerRecruitment/RecruitmentTable';
import { useRouter } from 'next/router';
import { Get } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import useFetchQuery from '@/hooks/useFetchQuery';
import SkeletonUI from '@/components/common/SkeletonUI';
import PaginationComponent from '@/components/common/PaginationComponent';
import RecruitmentList from '@/components/employerRecruitment/RecruitmentList';
import { ParsedUrlQuery } from 'querystring';
import { keepPreviousData } from '@tanstack/react-query';
import { RecruitmentQueryStatus } from '@/types/API';
import EmptyComponent from '@/components/common/EmptyComponent';

interface Query extends ParsedUrlQuery {
  page?: string;
  status?: RecruitmentQueryStatus;
}

interface RecruitmentListContainerProps {
  checkedItems: string[];
  handleClickCheckBoxItem: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RecruitmentListContainer({ checkedItems, handleClickCheckBoxItem }: RecruitmentListContainerProps) {
  const router = useRouter();
  const { page = '1', status = 'all' } = router.query as Query;

  const handleClickRecruitmentItem = (id: string) => {
    router.push(`/employer/recruitment/${id}`);
  };

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.RECRUITMENT_LIST, { page, status }],
    queryFn: Get.recruitmentList,
    options: {
      enabled: true,
      throwOnError: true,
      staleTime: 60 * 1000 * 5,
      gcTime: 60 * 1000 * 10,
      placeholderData: keepPreviousData,
    },
    requestQuery: {
      page: page,
      limit: '8',
      status: status.toLocaleUpperCase() as RecruitmentQueryStatus,
    },
  });

  console.log('채용공고 리스트 API : ', data);

  if (isLoading) {
    return <SkeletonUI.Table />;
  }

  const isEmpty = isSuccess && data && data.result.items.length === 0;

  if (isSuccess && data) {
    return (
      <RecruitmentList>
        <RecruitmentTable>
          <RecruitmentTable.Header />
          {isEmpty && <EmptyComponent />}
          <RecruitmentTable.Body
            checkedItems={checkedItems}
            handleClickRecruitmentItem={handleClickRecruitmentItem}
            items={data.result.items}
            handleClickCheckBoxItem={handleClickCheckBoxItem}
          />
        </RecruitmentTable>
        <PaginationComponent pagination={data.result.pagination} />
      </RecruitmentList>
    );
  }
}
