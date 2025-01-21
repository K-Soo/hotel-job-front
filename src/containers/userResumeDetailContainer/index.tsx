import React from 'react';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import { Get } from '@/apis';
import { useRouter } from 'next/router';
import UserResumeDetail from '@/components/userResumeDetail';
import ResumeBottomController from '@/components/common/resume/ResumeBottomController';
import SignIn from '@/components/signIn';
import Logo from '@/components/common/Logo';
import { signInTabOptions } from '@/constants/tabs';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { ResumeDetailForm, ResumeRegisterForm } from '@/types';
import { schema } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import FormDevTools from '@/components/common/FormDevTools';
import CompanyForm from '@/components/signIn/CompanyForm';
import GeneralForm from '@/components/signIn/GeneralForm';
import { Post } from '@/apis';
import useAuth from '@/hooks/useAuth';
import useToast from '@/hooks/useToast';
import { useQueryClient } from '@tanstack/react-query';
import ResumeProgress from '@/components/common/resume/ResumeProgress';

export default function UserResumeDetailContainer() {
  const router = useRouter();
  const { slug } = router.query;
  const { authAtomState } = useAuth();
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = React.useState(true);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const methods = useForm<ResumeDetailForm>({
    resolver: yupResolver(schema.resumeRegister),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    disabled: isDisabled,
    defaultValues: {
      resumeType: 'GENERAL', //이력서 타입
      careerLevel: 'NEWBIE', //경력여부
      title: '', //이력서 제목
      profileImage: '', //프로필 이미지
      name: '',
      localCode: undefined, //내국인, 외국인
      sexCode: undefined,
      email: '',
      phone: '',
      birthday: '',
      address: '',
      addressDetail: '',
      // 간단소개
      summary: '',

      //최종학력
      education: undefined,

      //경력
      experience: [],

      // 자격증
      licenses: [],
      // 외국어
      languages: [],
      isRequiredAgreement: false,
      isOptionalAgreement: false,
    },
  });
  console.log('errors: ', methods.formState.errors);
  console.log('methods: ', methods.watch());

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.RESUME_DETAIL, { slug, nickname: authAtomState.nickname }],
    queryFn: Get.getResumeDetail,
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

  React.useEffect(() => {
    if (isSuccess && data) {
      methods.setValue('title', data.result.title);
      methods.setValue('careerLevel', data.result.careerLevel);
      methods.setValue('profileImage', data.result.profileImage);
      methods.setValue('name', data.result.name);
      methods.setValue('localCode', data.result.localCode);
      methods.setValue('birthday', data.result.birthday);
      methods.setValue('education', data.result.education);
      methods.setValue('email', data.result.email);
      methods.setValue('sexCode', data.result.sexCode);
      methods.setValue('phone', data.result.phone);
      methods.setValue('summary', data.result.summary);
      methods.setValue('address', data.result.address);
      methods.setValue('addressDetail', data.result.addressDetail);

      methods.setValue('isRequiredAgreement', data.result.isRequiredAgreement);
      methods.setValue('isOptionalAgreement', data.result.isOptionalAgreement);

      if (data.result.experience && Array.isArray(data.result.experience)) {
        methods.setValue('experience', data.result.experience);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  const onSubmit: SubmitHandler<ResumeDetailForm> = async (data) => {
    setIsDisabled(true);
    try {
      const response = await Post.publishResume({
        ...data,
        id: slug as string,
      });
      console.log('이력서 작성완료 API : ', response);
      addToast({ type: 'success', message: '이력서가 등록되었습니다.' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RESUME_DETAIL], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RESUME_LIST], refetchType: 'all' });
    } catch (error) {
      addToast({ type: 'error', message: '이력서 등록에 실패했습니다.' });
    } finally {
      setIsDisabled(false);
    }
  };

  if (isLoading) {
    return <div>loading</div>;
  }

  if (isSuccess && data) {
    return (
      <FormProvider {...methods}>
        <UserResumeDetail status={data.result.status}>
          <ResumeProgress />
          <ResumeBottomController onSubmit={onSubmit} status={data.result.status} />
        </UserResumeDetail>
        <FormDevTools control={methods.control} />
      </FormProvider>
    );
  }
}
