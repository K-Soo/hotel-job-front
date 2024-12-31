import React from 'react';
import SignUp from '@/components/signUp';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { schema } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpForm } from '@/types';
import FormDevTools from '@/components/common/FormDevTools';
import SignUpGeneralForm from '@/components/signUp/SignUpGeneralForm';

export default function SignUpContainer() {
  const [step, setStep] = React.useState('STEP_1');

  const methods = useForm<SignUpForm>({
    resolver: yupResolver(schema.signUpSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      userId: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    try {
    } catch (error) {
    } finally {
    }
  };

  const handleNextStepOne = () => {
    // setStep('STEP_2')};
  };

  return (
    <FormProvider {...methods}>
      <SignUp onSubmit={onSubmit}>{step === 'STEP_1' && <SignUpGeneralForm setStep={setStep} />}</SignUp>
      <FormDevTools control={methods.control} />
    </FormProvider>
  );
}
