import React from 'react';
import RecruitDetail from '@/components/recruitDetail';
import { Get, Post } from '@/apis';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import { useRouter } from 'next/router';
import RecruitDetailSideMenu from '@/components/recruitDetail/RecruitDetailSideMenu';
import useToast from '@/hooks/useToast';
import useAuth from '@/hooks/useAuth';
import RecruitDetailApplyResumeForm from '@/components/recruitDetail/RecruitDetailApplyResumeForm';
import Button from '@/components/common/style/Button';
import { useQueryClient } from '@tanstack/react-query';
import Modal from '@/components/common/modal';
import dynamic from 'next/dynamic';
import useResponsive from '@/hooks/useResponsive';
import RecruitDetailBottomNavigation from '@/components/recruitDetail/RecruitDetailBottomNavigation';
import useModal from '@/hooks/useModal';

interface useFetchApplyCheckProps {
  recruitmentId: string | undefined;
}

export default function useFetchApplyCheck({ recruitmentId }: useFetchApplyCheckProps) {
  const { isAuthenticated, role, authAtomState } = useAuth();

  const {
    data: applyCheckData,
    isLoading: isApplyCheckLoading,
    isError: isApplyCheckError,
  } = useFetchQuery({
    queryKey: [queryKeys.APPLICATION_APPLY_CHECK, { slug: recruitmentId, role, nickName: authAtomState.nickname }],
    queryFn: Get.applicationApplyCheck,
    options: {
      enabled: !!recruitmentId && isAuthenticated && role === 'JOB_SEEKER',
      staleTime: 10 * 60 * 1000,
      gcTime: 15 * 60 * 1000,
    },
    requestQuery: {
      id: recruitmentId as string,
    },
  });

  return {
    applyCheckData,
    isApplyCheckLoading,
    isApplyCheckError,
  };
}
