import React from 'react';
import EmployerBusiness from '@/components/employerBusiness';
import EmployerBusinessFormContainer from '@/containers/employerBusinessContainer/EmployerBusinessFormContainer';
import EmployerBusinessManagerFormContainer from '@/containers/employerBusinessContainer/EmployerBusinessManagerFormContainer';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import { Get } from '@/apis';
import useAuth from '@/hooks/useAuth';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/utils';
import { EmployerBusinessForm } from '@/types';
import SkeletonUI from '@/components/common/SkeletonUI';

export default function EmployerBusinessContainer() {
  const { authAtomState, isAuthenticated } = useAuth();

  const methods = useForm<EmployerBusinessForm>({
    resolver: yupResolver(schema.businessManagerForm),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      address: '',
      addressDetail: '',
      businessOwner: '',
      businessRegistrationNumber: '',
      companyName: '',
      managerEmail: '',
      managerName: '',
      managerNumber: '',
    },
  });

  const { data, isLoading } = useFetchQuery({
    queryKey: [queryKeys.MY_COMPANY, { nickname: authAtomState.nickname }],
    queryFn: Get.employerCompany,
    options: {
      throwOnError: true,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  });

  console.log('업체정보 API : ', data);

  React.useEffect(() => {
    if (data) {
      const { result } = data;
      methods.setValue('businessOwner', result.businessOwner);
      methods.setValue('businessRegistrationNumber', result.businessRegistrationNumber);
      methods.setValue('companyName', result.companyName);
      methods.setValue('addressDetail', result.addressDetail);
      methods.setValue('address', result.address);

      methods.setValue('managerName', result.managerName);
      methods.setValue('managerEmail', result.managerEmail);
      methods.setValue('managerNumber', result.managerNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) {
    return <SkeletonUI.Document />;
  }

  return (
    <FormProvider {...methods}>
      <EmployerBusiness>
        <EmployerBusinessFormContainer />
        <EmployerBusinessManagerFormContainer />
      </EmployerBusiness>
    </FormProvider>
  );
}
