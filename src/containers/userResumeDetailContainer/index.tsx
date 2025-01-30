import React from 'react';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import { Get } from '@/apis';
import { useRouter } from 'next/router';
import UserResumeDetail from '@/components/userResumeDetail';
import ResumeBottomController from '@/components/common/resume/ResumeBottomController';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { ResumeDetail, ResumeDetailForm } from '@/types';
import { schema } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import FormDevTools from '@/components/common/FormDevTools';
import { Post } from '@/apis';
import useAuth from '@/hooks/useAuth';
import useToast from '@/hooks/useToast';
import { useQueryClient } from '@tanstack/react-query';
import ResumeProgress from '@/components/common/resume/ResumeProgress';
import { useResumeContext } from '@/context/ResumeProvider';
import ResumePreview from '@/components/common/resume/resumePreview';

export default function UserResumeDetailContainer() {
  const [resumePreviewData, setResumePreviewData] = React.useState<ResumeDetail | null>(null);
  const router = useRouter();
  const { slug } = router.query;
  const { authAtomState } = useAuth();
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  const [isDisabled, setIsDisabled] = React.useState(false);
  const { setResumeStatus, isContextLoading, setIsContextLoading, setIsEditing } = useResumeContext();

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
      summary: '', // 간단소개
      education: undefined, //최종학력
      experience: [], //경력
      licenses: [], // 자격증
      languages: [], // 외국어
      isRequiredAgreement: false,
      isOptionalAgreement: false,
    },
  });

  // console.log('methods: ', methods.watch());

  const { data, isLoading, isSuccess, refetch } = useFetchQuery({
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
    if (data) {
      setResumeStatus(data.result.status);
      setIsEditing(data.result.status === 'DRAFT' ? true : false);
      setIsContextLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  React.useEffect(() => {
    if (isSuccess && data) {
      // if (isSuccess && data) {
      //   methods.reset(data.result); // 한 번에 설정
      // }

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
      if (data.result.licenses && Array.isArray(data.result.licenses)) {
        methods.setValue('licenses', data.result.licenses);
      }
      if (data.result.languages && Array.isArray(data.result.languages)) {
        methods.setValue('languages', data.result.languages);
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

  const handleClickPreview = React.useCallback(() => {
    if (data?.result) {
      const values = methods.watch();

      setResumePreviewData(data.result);
    }
  }, [data?.result]);

  if (isLoading || isContextLoading) {
    return <div>loading</div>;
  }

  if (isSuccess && data) {
    return (
      <FormProvider {...methods}>
        {resumePreviewData && <ResumePreview resumePreviewData={resumePreviewData} closeResume={() => setResumePreviewData(null)} />}
        <UserResumeDetail>
          <ResumeProgress handleClickPreview={handleClickPreview} />
          <ResumeBottomController onSubmit={onSubmit} refetch={refetch} updatedAt={data.result.updatedAt} />
        </UserResumeDetail>
        <FormDevTools control={methods.control} />
      </FormProvider>
    );
  }
}
