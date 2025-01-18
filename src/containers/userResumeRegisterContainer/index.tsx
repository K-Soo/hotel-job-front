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
import useToast from '@/hooks/useToast';

export default function UserResumeRegisterContainer() {
  const { authAtomState } = useAuth();
  const { addToast } = useToast();

  const methods = useForm<ResumeRegisterForm>({
    resolver: yupResolver(schema.resumeRegister),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      resumeType: 'GENERAL', //이력서 타입
      careerLevel: 'NEWBIE', //경력여부
      title: '', //이력서 제목
      profileImage: '', //프로필 이미지
      name: '',
      localCode: undefined, //내국인, 외국인
      sexCode: undefined,
      phone: '',
      birthday: '',
      address: 'ㅇㅇㅇㅇㅇ',
      addressDetail: 'ㅇㅇㅇㅇ',
      // 간단소개
      summary: '',

      //최종학력
      education: undefined,

      //경력
      // experiences: [],
      // 자격증
      licenses: [],
      // 외국어
      languages: [],
      isRequiredAgreement: false,
      isOptionalAgreement: false,
    },
  });

  // React.useEffect(() => {
  //   if (authAtomState.certificationStatus !== 'VERIFIED') {
  //     alert('이력서 등록을 위해서는 본인인증이 필요합니다.');
  //     window.location.href = '/user/resume';
  //   }
  // }, []);

  const onSubmit: SubmitHandler<ResumeRegisterForm> = async (data) => {
    addToast({ type: 'success', message: '이력서가 등록되었습니다.' });
    try {
    } catch (error) {
    } finally {
    }
  };
  console.log('errors: ', methods.formState.errors);

  const handleClickAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    // const { name } = event.currentTarget;
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

  React.useEffect(() => {
    // methods.setValue('languages', [{ name: 'JAPANESE' }]);
    methods.setValue('title', '아아앙아');
    methods.setValue('name', '고원호');
    methods.setValue('localCode', '01');
    methods.setValue('sexCode', '01');
    methods.setValue('phone', '01064797825');
    methods.setValue('birthday', '1991.10.29');
  }, []);

  return (
    <FormProvider {...methods}>
      <UserResumeRegister handleClickAdd={handleClickAdd}>
        <div></div>
        {/* <ResumeBottomController onSubmit={onSubmit} /> */}
      </UserResumeRegister>
      {/* <FormDevTools control={methods.control} /> */}
    </FormProvider>
  );
}
