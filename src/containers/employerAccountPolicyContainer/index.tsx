import React from 'react';
import EmployerAccountPolicy from '@/components/employerAccountPolicy';
import { useForm, FormProvider, SubmitHandler, useFormContext } from 'react-hook-form';

export default function EmployerAccountPolicyContainer() {
  const methods = useForm<any>({
    // disabled: disabled,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {},
  });

  return (
    <FormProvider {...methods}>
      <EmployerAccountPolicy />
    </FormProvider>
  );
}
