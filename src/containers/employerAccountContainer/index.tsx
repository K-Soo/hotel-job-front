import React from 'react';
import EmployerAccount from '@/components/employerAccount';
import { useForm, FormProvider, SubmitHandler, useFormContext } from 'react-hook-form';

export default function EmployerAccountContainer() {
  const methods = useForm<any>({
    // disabled: disabled,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {},
  });

  return (
    <FormProvider {...methods}>
      <EmployerAccount />
    </FormProvider>
  );
}
