import React from 'react';
import EmployerBusiness from '@/components/employerBusiness';
import EmployerBusinessFormContainer from '@/containers/employerBusinessContainer/EmployerBusinessFormContainer';
import EmployerBusinessManagerFormContainer from '@/containers/employerBusinessContainer/EmployerBusinessManagerFormContainer';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import { Get } from '@/apis';
import useAuth from '@/hooks/useAuth';

// TODO: 리펙토링 및 기능 구현, API 호출
export default function EmployerBusinessContainer() {
  const { authAtomState, isAuthenticated } = useAuth();

  const { data } = useFetchQuery({
    queryKey: [queryKeys.MY_COMPANY, { nickname: authAtomState.nickname }],
    queryFn: Get.getMyCompany,
    options: {
      enabled: isAuthenticated,
      staleTime: 60 * 1000 * 5,
      gcTime: 60 * 1000 * 10,
    },
  });
  console.log('data: ', data);

  return (
    <EmployerBusiness>
      <EmployerBusinessFormContainer />
      <EmployerBusinessManagerFormContainer />
    </EmployerBusiness>
  );
}
