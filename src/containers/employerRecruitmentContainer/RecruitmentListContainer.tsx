import React from 'react';
import RecruitmentTable from '@/components/employerRecruitment/RecruitmentTable';
import { useRouter } from 'next/router';
import { Get, Patch } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import useFetchQuery from '@/hooks/useFetchQuery';
import SkeletonUI from '@/components/common/SkeletonUI';
import PaginationComponent from '@/components/common/PaginationComponent';
import RecruitmentList from '@/components/employerRecruitment/RecruitmentList';
import { ParsedUrlQuery } from 'querystring';
import { keepPreviousData } from '@tanstack/react-query';
import { RecruitmentQueryStatus } from '@/types/API';
import EmptyComponent from '@/components/common/EmptyComponent';
import { RecruitmentStatusKeys } from '@/types';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';
import useLoading from '@/hooks/useLoading';
import useToast from '@/hooks/useToast';
import { useQueryClient } from '@tanstack/react-query';

interface Query extends ParsedUrlQuery {
  page?: string;
  status?: RecruitmentQueryStatus;
}

interface RecruitmentListContainerProps {
  checkedItems: string[];
  resetCheckedItems: () => void;
  handleClickCheckBoxItem: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickDeleteRecruitment: (ids: string[]) => Promise<void>;
}

export default function RecruitmentListContainer({
  checkedItems,
  handleClickCheckBoxItem,
  resetCheckedItems,
  handleClickDeleteRecruitment,
}: RecruitmentListContainerProps) {
  const router = useRouter();
  const { page = '1', status = 'all' } = router.query as Query;

  const queryClient = useQueryClient();

  const { setAlertWithConfirmAtom } = useAlertWithConfirm();
  const { setLoadingAtomStatue } = useLoading();
  const { addToast } = useToast();

  const handleClickRecruitmentItem = (id: string, status: RecruitmentStatusKeys) => {
    if (status === 'DRAFT') {
      return router.push(`/employer/recruitment/${id}`);
    }

    router.push(`/employer/recruitment/${id}/applicant`);
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
      limit: '6',
      status: status.toLocaleUpperCase() as RecruitmentQueryStatus,
    },
  });

  console.log('채용공고 리스트 API : ', data);

  // API - 채용공고 마감
  const fetchCloseRecruitment = async (recruitmentId: string) => {
    setLoadingAtomStatue({ isLoading: true });
    try {
      const response = await Patch.closedRecruitment({ recruitmentId });
      console.log('채용공고 마감 API : ', response);
      addToast({ type: 'success', message: '성공적으로 마감되었습니다.' });

      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_LIST], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_STATUS], refetchType: 'all' });
    } catch (error) {
      console.log('error: ', error);
      addToast({ type: 'error', message: '채용공고 마감에 실패했습니다.' });
    } finally {
      setLoadingAtomStatue({ isLoading: false });
    }
  };

  const handleCloseRecruitment = async (recruitmentId: string) => {
    resetCheckedItems();
    setAlertWithConfirmAtom((prev) => ({
      ...prev,
      type: 'CONFIRM',
      confirmVariant: 'delete',
      confirmLabel: '마감',
      cancelLabel: '취소',
      title: 'TITLE_11',
      subTitle: 'DESC_12',
      onClickConfirm: () => fetchCloseRecruitment(recruitmentId),
    }));
  };

  if (isLoading) {
    return <SkeletonUI.Table />;
  }

  const isEmpty = isSuccess && data && data.result.items.length === 0;

  if (isSuccess && data) {
    return (
      <RecruitmentList>
        <RecruitmentTable>
          <RecruitmentTable.Header />
          {isEmpty && <EmptyComponent message="조건에 맞는 공고를 찾을 수 없습니다." />}
          <RecruitmentTable.Body
            checkedItems={checkedItems}
            handleClickRecruitmentItem={handleClickRecruitmentItem}
            items={data.result.items}
            handleClickCheckBoxItem={handleClickCheckBoxItem}
            handleCloseRecruitment={handleCloseRecruitment}
            handleClickDeleteRecruitment={handleClickDeleteRecruitment}
          />
        </RecruitmentTable>
        <PaginationComponent pagination={data.result.pagination} />
      </RecruitmentList>
    );
  }
}
