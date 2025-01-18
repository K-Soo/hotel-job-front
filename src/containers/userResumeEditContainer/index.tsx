import React from 'react';
import EmployerRecruitmentDetail from '@/components/employerRecruitmentDetail';
import { useForm, FormProvider, SubmitHandler, useFormContext } from 'react-hook-form';
import FormDevTools from '@/components/common/FormDevTools';
import dynamic from 'next/dynamic';
import RecruitmentDetailProgressMenu from '@/components/employerRecruitmentDetail/RecruitmentDetailProgressMenu';
import { RecruitmentDetailForm } from '@/types';
import { Post, Patch } from '@/apis';
import { schema } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import path from '@/constants/path';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import { Get } from '@/apis';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useToast from '@/hooks/useToast';
import SkeletonUI from '@/components/common/SkeletonUI';
import Button from '@/components/common/style/Button';
import useLoading from '@/hooks/useLoading';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';
import { useRecoilValue } from 'recoil';
import { daumPostAtom } from '@/recoil/daumPost';

export default function UserResumeEditContainer() {
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.RESUME_EDIT, { slug }],
    queryFn: Get.getResumeEdit,
    options: {
      enabled: !!slug,
      throwOnError: true,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
    requestQuery: {
      id: slug as string,
    },
  });

  console.log('이력서 상세 API : ', data);

  return <>index</>;
}
