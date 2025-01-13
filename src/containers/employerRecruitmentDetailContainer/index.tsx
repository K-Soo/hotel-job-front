import React from 'react';
import EmployerRecruitmentDetail from '@/components/employerRecruitmentDetail';
import { useForm, FormProvider, SubmitHandler, useFormContext } from 'react-hook-form';
import FormDevTools from '@/components/common/FormDevTools';
import dynamic from 'next/dynamic';
import RecruitmentDetailProgressMenu from '@/components/employerRecruitmentDetail/RecruitmentDetailProgressMenu';
import { RecruitmentDetailForm } from '@/types';
import { Post, Patch } from '@/apis';
import { schema } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import path from '@/constants/path';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import { Get } from '@/apis';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useToast from '@/hooks/useToast';
import SkeletonUI from '@/components/common/SkeletonUI';
import Button from '@/components/common/style/Button';
import useLoading from '@/hooks/useLoading';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';
import { useRecoilValue } from 'recoil';
import { daumPostAtom } from '@/recoil/daumPost';

const DynamicJobModal = dynamic(() => import('@/components/common/employer/JobModal'), { ssr: false });
const DynamicBenefitsModal = dynamic(() => import('@/components/common/employer/BenefitsModal'), { ssr: false });
const DynamicPreferencesModal = dynamic(() => import('@/components/common/employer/PreferencesModal'), { ssr: false });

const DynamicDaumPost = dynamic(() => import('@/components/common/DaumPost'), { ssr: false });

export default function EmployerRecruitmentDetailContainer() {
  const [isOpenJobModal, setIsOpenJobModal] = React.useState(false);
  const [isOpenBenefitsModal, setIsOpenBenefitsModal] = React.useState(false);
  const [isOpenPreferencesModal, setIsOpenPreferencesModal] = React.useState(false);

  const [isDisabled, setIsDisabled] = React.useState(false);

  const { addToast } = useToast();
  const queryClient = useQueryClient();
  const { setLoadingAtomStatue } = useLoading();
  const { setAlertWithConfirmAtom } = useAlertWithConfirm();
  const daumPostAtomValue = useRecoilValue(daumPostAtom);

  const router = useRouter();
  const { slug } = router.query;

  const methods = useForm<RecruitmentDetailForm>({
    resolver: yupResolver(schema.recruitmentSchema),
    disabled: isDisabled,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      recruitmentTitle: undefined,
      recruitmentStatus: undefined,
      recruitmentInfo: {
        jobs: [],
        experienceCondition: undefined,
        nationality: {
          foreigner: false,
          korean: false,
          marriageVisa: undefined,
        },
        recruitmentCapacity: undefined,
        educationCondition: undefined,
        department: '',
        position: null,
        preferences: [], // 필수/우대조건
      },
      content: '',
      conditionInfo: {
        benefits: [],
        employmentType: {
          FULL_TIME: false,
          CONTRACT: false,
          DAILY_WORKER: false,
          PART_TIME: false,
          INTERN: false,
        },
        salaryType: 'MONTHLY', //급여 타입
        salaryAmount: 0, //급여액
        workingDay: null, //근무요일 (optional)
        workingTime: { start: '', end: '' }, //근무시간 (optional)
      },
      locationInfo: {
        roomCount: 0,
        address: '',
        addressDetail: '',
      },
      managerInfo: {
        managerName: '',
        isNamePrivate: false,

        managerNumber: '',
        isNumberPrivate: false,

        managerEmail: '',
        isEmailPrivate: false,
      },
    },
  });

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.RECRUITMENT_DETAIL, { slug }],
    queryFn: Get.recruitmentDetail,
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

  console.log('채용 공고 상세 API : ', data);

  React.useEffect(() => {
    if (isSuccess && data?.result) {
      const { result } = data;
      methods.setValue('recruitmentTitle', result.recruitmentTitle);
      methods.setValue('recruitmentStatus', result.recruitmentStatus);

      methods.setValue('recruitmentInfo.jobs', result.recruitmentInfo.jobs);
      methods.setValue('recruitmentInfo.recruitmentCapacity', result.recruitmentInfo.recruitmentCapacity);
      methods.setValue('recruitmentInfo.educationCondition', result.recruitmentInfo.educationCondition);
      methods.setValue('recruitmentInfo.department', result.recruitmentInfo.department);
      methods.setValue('recruitmentInfo.position', result.recruitmentInfo.position);
      methods.setValue('recruitmentInfo.preferences', result.recruitmentInfo.preferences);
      methods.setValue('recruitmentInfo.experienceCondition', result.recruitmentInfo.experienceCondition);
      methods.setValue('recruitmentInfo.nationality.korean', result.recruitmentInfo.nationality.korean);
      methods.setValue('recruitmentInfo.nationality.foreigner', result.recruitmentInfo.nationality.foreigner);
      methods.setValue('recruitmentInfo.nationality.marriageVisa', result.recruitmentInfo.nationality.marriageVisa);

      methods.setValue('content', result.content);

      methods.setValue('conditionInfo.employmentType', result.conditionInfo.employmentType);
      methods.setValue('conditionInfo.salaryType', result.conditionInfo.salaryType);
      methods.setValue('conditionInfo.salaryAmount', result.conditionInfo.salaryAmount);

      methods.setValue('conditionInfo.workingDay', result.conditionInfo.workingDay);
      methods.setValue('conditionInfo.workingTime', result.conditionInfo.workingTime);
      methods.setValue('conditionInfo.benefits', result.conditionInfo.benefits);

      methods.setValue('locationInfo.roomCount', result.locationInfo.roomCount);
      methods.setValue('locationInfo.address', result.locationInfo.address);
      methods.setValue('locationInfo.addressDetail', result.locationInfo.addressDetail);

      methods.setValue('managerInfo.managerName', result.managerInfo.managerName);
      methods.setValue('managerInfo.isNamePrivate', result.managerInfo.isNamePrivate);
      methods.setValue('managerInfo.managerNumber', result.managerInfo.managerNumber);
      methods.setValue('managerInfo.isNumberPrivate', result.managerInfo.isNumberPrivate);
      methods.setValue('managerInfo.managerEmail', result.managerInfo.managerEmail);
      methods.setValue('managerInfo.isEmailPrivate', result.managerInfo.isEmailPrivate);
    }
  }, [isSuccess, data, methods]);
  console.log('methods: ', methods.watch());

  // fetch - 임시저장
  const fetchDraftRecruitment = async () => {
    setIsDisabled(true);
    const watchValues = methods.watch();
    try {
      const response = await Post.draftRecruitment({
        ...watchValues,
        id: slug as string,
        recruitmentStatus: 'DRAFT',
      });

      console.log('임시저장 API : ', response);

      if (!response.success) {
        throw new Error();
      }

      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_STATUS], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_LIST], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_DETAIL], refetchType: 'all' });

      addToast({ message: '임시저장', type: 'info' });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.data?.error?.code;
        if (errorCode === 'ERR-4000') {
          return addToast({ message: '변경내용이 없습니다.', type: 'info' });
        }
      }
      alert('임시저장 중 문제가 발생했습니다. 문제가 지속되면 관리자에게 문의하세요.');
    } finally {
      setIsDisabled(false);
    }
  };

  const onSubmit: SubmitHandler<RecruitmentDetailForm> = async (submitData, event) => {
    event?.preventDefault();
    setIsDisabled(true);
    try {
      const response = await Post.createRecruitment({
        ...submitData,
        id: data?.result.id,
        recruitmentStatus: 'PUBLISHED',
      });

      console.log('채용공고 생성 API : ', response);
      if (response.result.status !== 'success') {
        throw new Error();
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_STATUS], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_LIST], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_DETAIL], refetchType: 'all' });

      setAlertWithConfirmAtom((prev) => ({
        ...prev,
        type: 'ALERT',
        title: 'TITLE_3',
        subTitle: 'DESC_3',
        confirmLabel: '확인',
        onClickConfirm: () => router.replace(path.EMPLOYER_RECRUITMENT),
      }));
    } catch (error) {
      alert('공고 생성 중 문제가 발생했습니다. 문제가 지속되면 관리자에게 문의하세요.');
    } finally {
      setIsDisabled(false);
    }
  };

  const fetchUpdateRecruitment: SubmitHandler<RecruitmentDetailForm> = async (event) => {
    setIsDisabled(true);
    const watchData = methods.watch();
    try {
      if (!data?.result?.id) {
        throw new Error();
      }
      const response = await Patch.updateRecruitment({
        ...watchData,
        id: data.result.id,
        recruitmentStatus: 'PUBLISHED',
      });

      console.log('채용공고 수정 API : ', response);

      if (response.result.status !== 'success') {
        throw new Error();
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_STATUS], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_LIST], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_DETAIL], refetchType: 'all' });

      router.replace(path.EMPLOYER_RECRUITMENT);

      setTimeout(() => {
        addToast({ message: '채용공고 수정완료', type: 'success' });
      }, 800);
    } catch (error) {
      alert('공고 수정 중 문제가 발생했습니다. 문제가 지속되면 관리자에게 문의하세요.');
    } finally {
      setIsDisabled(false);
    }
  };

  if (isLoading) {
    return <SkeletonUI.Recruitment />;
  }

  if (isSuccess && data?.result) {
    return (
      <FormProvider {...methods}>
        {isOpenJobModal && <DynamicJobModal name="recruitmentInfo.jobs" setIsOpenJobModal={setIsOpenJobModal} />}
        {isOpenBenefitsModal && <DynamicBenefitsModal name="conditionInfo.benefits" setIsOpenBenefitsModal={setIsOpenBenefitsModal} />}
        {isOpenPreferencesModal && (
          <DynamicPreferencesModal name="recruitmentInfo.preferences" setIsOpenPreferencesModal={setIsOpenPreferencesModal} />
        )}
        {daumPostAtomValue.isOpen && <DynamicDaumPost addressName="locationInfo.address" addressDetailName="locationInfo.addressDetail" />}

        <EmployerRecruitmentDetail
          setIsOpenJobModal={setIsOpenJobModal}
          setIsOpenBenefitsModal={setIsOpenBenefitsModal}
          setIsOpenPreferencesModal={setIsOpenPreferencesModal}
          isSuccess={isSuccess}
        >
          <RecruitmentDetailProgressMenu fetchDraftRecruitment={fetchDraftRecruitment}>
            {/* 임시저장 상태 */}
            {data.result.recruitmentStatus === 'DRAFT' && (
              <Button
                label="공고 등록"
                variant="primary"
                margin="0 0 10px 0"
                onClick={methods.handleSubmit(onSubmit)}
                type="button"
                isLoading={methods.formState.isSubmitting}
              />
            )}

            {data.result.recruitmentStatus === 'PUBLISHED' && (
              <Button
                label="공고 수정"
                variant="primary"
                margin="0 0 10px 0"
                onClick={methods.handleSubmit(fetchUpdateRecruitment)}
                type="button"
                isLoading={methods.formState.isSubmitting}
                disabled={isDisabled}
              />
            )}

            {data.result.recruitmentStatus === 'DRAFT' && (
              <Button label="임시저장" variant="tertiary" onClick={fetchDraftRecruitment} margin="0 0 10px 0" isLoading={isDisabled} />
            )}
          </RecruitmentDetailProgressMenu>
        </EmployerRecruitmentDetail>
        <FormDevTools control={methods.control} />
      </FormProvider>
    );
  }
}
