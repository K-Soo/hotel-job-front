import React from 'react';
import EmployerAccount from '@/components/employerAccount';
import { useForm, FormProvider } from 'react-hook-form';
import queryKeys from '@/constants/queryKeys';
import { Get } from '@/apis';
import useFetchQuery from '@/hooks/useFetchQuery';
import { EmployerAccountInfoForm } from '@/types';
import CertificationModal from '@/components/common/CertificationModal';
import { useRecoilState } from 'recoil';
import { certificationModalAtom } from '@/recoil/certification';

export default function EmployerAccountContainer() {
  const [certificationModalAtomState, setCertificationModalAtomState] = useRecoilState(certificationModalAtom);

  const methods = useForm<EmployerAccountInfoForm>({
    // disabled: disabled,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {},
  });

  const { data, isLoading } = useFetchQuery({
    queryKey: [queryKeys.EMPLOYER_ACCOUNT],
    queryFn: Get.employerAccountInfo,
    options: {
      throwOnError: true,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  });

  React.useEffect(() => {
    if (data) {
      const { result } = data;
      methods.setValue('userId', result.userId);
      methods.setValue('nickname', result.nickname);
      methods.setValue('createdAt', result.createdAt);
      methods.setValue('certification', result.certification);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  console.log('계정정보 API : ', data);

  return (
    <>
      {certificationModalAtomState.isOpen && <CertificationModal />}

      <FormProvider {...methods}>
        <EmployerAccount />
      </FormProvider>
    </>
  );
}
