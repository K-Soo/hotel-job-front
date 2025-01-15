import React from 'react';
import UserResumeRegister from '@/components/userResumeRegister';
import ResumeBottomController from '@/components/common/resume/ResumeBottomController';
import SignIn from '@/components/signIn';
import Logo from '@/components/common/Logo';
import { signInTabOptions } from '@/constants/tabs';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { ResumeRegisterForm } from '@/types';
import { schema } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import FormDevTools from '@/components/common/FormDevTools';
import CompanyForm from '@/components/signIn/CompanyForm';
import GeneralForm from '@/components/signIn/GeneralForm';
import { Post } from '@/apis';
import useAuth from '@/hooks/useAuth';

export default function UserResumeRegisterContainer() {
  const methods = useForm<ResumeRegisterForm>({
    resolver: yupResolver(schema.resumeRegister),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      resumeType: 'GENERAL',
      careerLevel: 'NEWBIE',
      education: undefined,
      title: '',
      summary: '',
      // experiences: [],
      isRequiredAgreement: false,
      isOptionalAgreement: false,
      licenses: [],
    },
  });

  // const methods = useForm<ResumeRegisterForm>({
  //   resolver: yupResolver(schema.resumeRegister),
  //   mode: 'onSubmit',
  //   reValidateMode: 'onChange',
  //   defaultValues: {
  //     resumeType: 'GENERAL',
  //     careerLevel: 'NEWBIE',
  //     title: '',
  //     summary: '',
  //     education: undefined,
  //     isGraduated: true,
  //     experiences: [],
  //     languages: [],
  //     introduction: '',
  //   },
  // });

  const onSubmit: SubmitHandler<ResumeRegisterForm> = async (data) => {
    try {
    } catch (error) {
    } finally {
    }
  };

  const handleClickAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;
    // const getValues = methods.getValues('experiences');

    // methods.setValue('experiences', [
    //   ...getValues,
    //   {
    //     companyName: '',
    //     isEmployed: false,
    //     responsibility: '',
    //     job: undefined,
    //     // city: 'NONE',
    //     startDate: new Date(),
    //     endDate: new Date(),
    //     position: undefined,
    //     salaryType: undefined,
    //     // baseSalary: 0,
    //     // allowance: 0,
    //     // reasonForLeaving: '',
    //   },
    // ]);
  };

  return (
    <FormProvider {...methods}>
      <UserResumeRegister handleClickAdd={handleClickAdd}>
        <ResumeBottomController onSubmit={onSubmit} />
      </UserResumeRegister>
      <FormDevTools control={methods.control} />
    </FormProvider>
  );
}
