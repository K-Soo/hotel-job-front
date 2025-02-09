import React from 'react';
import EmployerBusiness from '@/components/employerBusiness';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import { Get } from '@/apis';
import useAuth from '@/hooks/useAuth';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/utils';
import { EmployerBusinessForm } from '@/types';
import SkeletonUI from '@/components/common/SkeletonUI';
import SectionTitle from '@/components/common/employer/SectionTitle';
import Modal from '@/components/common/modal';
import dynamic from 'next/dynamic';
import Button from '@/components/common/style/Button';

export default function EmployerBusinessContainer() {
  const { authAtomState } = useAuth();

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.MY_COMPANY, { nickname: authAtomState.nickname }],
    queryFn: Get.employerCompany,
    options: {
      throwOnError: true,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  });

  console.log('업체정보 API : ', data);

  if (isLoading) {
    return (
      <EmployerBusiness>
        <SectionTitle title="업체 정보" />
        <SkeletonUI.Document />
      </EmployerBusiness>
    );
  }

  if (isSuccess && data) {
    return (
      <EmployerBusiness data={data.result}>
        <SectionTitle title="업체 정보" />
      </EmployerBusiness>
    );
  }
}
