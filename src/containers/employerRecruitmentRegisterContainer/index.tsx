import React from 'react';
import EmployerRecruitmentRegister from '@/components/employerRecruitmentRegister';
import { useForm, FormProvider, SubmitHandler, useFormContext, SubmitErrorHandler, Path } from 'react-hook-form';
import FormDevTools from '@/components/common/FormDevTools';
import dynamic from 'next/dynamic';
import RecruitmentRegisterProgressMenu from '@/components/employerRecruitmentRegister/RecruitmentRegisterProgressMenu';
import { CreateRecruitmentForm } from '@/types';
import { Get, Post } from '@/apis';
import { schema } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import useToast from '@/hooks/useToast';
import path from '@/constants/path';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/constants/queryKeys';
import Button from '@/components/common/style/Button';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';
import { QUILL_RECRUITMENT_INIT_TEXT } from '@/constants/quill';
import { daumPostAtom } from '@/recoil/daumPost';
import { useRecoilValue } from 'recoil';
import useFetchQuery from '@/hooks/useFetchQuery';
import useAuth from '@/hooks/useAuth';

const DynamicJobModal = dynamic(() => import('@/components/common/employer/JobModal'), { ssr: false });
const DynamicBenefitsModal = dynamic(() => import('@/components/common/employer/BenefitsModal'), { ssr: false });
const DynamicDaumPost = dynamic(() => import('@/components/common/DaumPost'), { ssr: false });

export type Person = {
  users: {
    name: string;
    age: number;
  }[];
  job: {
    name: string;
    age: number;
  }[];
};

export default function EmployerRecruitmentRegisterContainer() {
  const [isOpenJobModal, setIsOpenJobModal] = React.useState(false);
  const [isOpenBenefitsModal, setIsOpenBenefitsModal] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const { authAtomState } = useAuth();
  const { addToast } = useToast();
  const { setAlertWithConfirmAtom } = useAlertWithConfirm();
  const daumPostAtomValue = useRecoilValue(daumPostAtom);

  const router = useRouter();
  const queryClient = useQueryClient();

  const methods = useForm<CreateRecruitmentForm>({
    resolver: yupResolver(schema.recruitmentSchema),
    disabled: isDisabled,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      recruitmentTitle: '',
      recruitmentStatus: 'DRAFT',
      // 모집내용
      recruitmentInfo: {
        // jobs: [],
        experienceCondition: undefined,
        nationality: {
          korean: false,
          foreigner: false,
          marriageVisa: '',
        },
        recruitmentCapacity: 1,
        educationCondition: 'NOT_REQUIRED',
        preferences: [], // 우대조건
        department: '', // 근무부서
        position: null, // 직급
      },
      //근무조건
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
      // 상세 모집내용
      content: QUILL_RECRUITMENT_INIT_TEXT,
      // 근무지 정보
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
  console.log('errors: ', methods.formState.errors);

  const onSubmit: SubmitHandler<CreateRecruitmentForm> = async (data, event) => {
    event?.preventDefault();
    setIsDisabled(true);

    try {
      const response = await Post.createRecruitment({
        ...data,
        recruitmentStatus: 'PUBLISHED',
      });
      console.log('채용공고 생성 API : ', response);
      if (response.result.status !== 'success') {
        throw new Error();
      }

      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_STATUS], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_LIST], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.MY_COMPANY], refetchType: 'all' });

      setAlertWithConfirmAtom((prev) => ({
        ...prev,
        type: 'ALERT',
        title: 'TITLE_3',
        subTitle: 'DESC_3',
        confirmLabel: '확인',
        onClickConfirm: () => router.replace(path.EMPLOYER_RECRUITMENT),
      }));
    } catch (error) {
      alert('공고생성 중 문제가 발생했습니다. 문제가 지속되면 관리자에게 문의하세요.');
    } finally {
      setIsDisabled(false);
    }
  };

  // fetch - 임시저장
  const fetchDraftRecruitment = async () => {
    setIsDisabled(true);
    const watchValues = methods.watch();
    try {
      const response = await Post.draftRecruitment({
        ...watchValues,
        recruitmentStatus: 'DRAFT',
      });
      console.log('임시저장 API : ', response);
      if (response.result.status !== 'success') {
        throw new Error();
      }
      addToast({ message: '임시저장', type: 'info' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_LIST], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_STATUS], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.MY_COMPANY], refetchType: 'all' });

      router.replace(`${path.EMPLOYER_RECRUITMENT}/${response.result.id}`, undefined, { scroll: false });
    } catch (error) {
      alert('임시저장 중 문제가 발생했습니다. 문제가 지속되면 관리자에게 문의하세요.');
    } finally {
      setIsDisabled(false);
    }
  };

  const { data: businessData } = useFetchQuery({
    queryKey: [queryKeys.MY_COMPANY, { nickname: authAtomState.nickname }],
    queryFn: Get.employerCompany,
    options: {
      throwOnError: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  });

  React.useEffect(() => {
    if (businessData && businessData.result) {
      const { result } = businessData;

      methods.setValue('locationInfo.address', result.address);
      methods.setValue('locationInfo.addressDetail', result.addressDetail);

      methods.setValue('managerInfo.managerName', result.managerName);
      methods.setValue('managerInfo.managerNumber', result.managerNumber);
      methods.setValue('managerInfo.managerEmail', result.managerEmail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessData]);

  const findFirstErrorField = (errors: any): string | null => {
    for (const key in errors) {
      if (errors[key]?.type) {
        // 현재 필드가 에러를 가진 경우
        return key;
      }
      if (typeof errors[key] === 'object') {
        // 중첩된 객체를 재귀적으로 탐색
        const nestedKey = findFirstErrorField(errors[key]);
        if (nestedKey) {
          return `${key}.${nestedKey}`;
        }
      }
    }
    return null;
  };

  const onError: SubmitErrorHandler<CreateRecruitmentForm> = (errors) => {
    const firstErrorField = findFirstErrorField(errors);
    console.log('firstErrorField: ', firstErrorField);

    if (firstErrorField) {
      // methods.setFocus(firstErrorField as Path<CreateRecruitmentForm>); // 해당 필드로 포커스 이동
    }
  };

  return (
    <FormProvider {...methods}>
      {isOpenJobModal && <DynamicJobModal name="recruitmentInfo.jobs" setIsOpenJobModal={setIsOpenJobModal} />}
      {isOpenBenefitsModal && <DynamicBenefitsModal name="conditionInfo.benefits" setIsOpenBenefitsModal={setIsOpenBenefitsModal} />}
      {daumPostAtomValue.isOpen && <DynamicDaumPost addressName="locationInfo.address" addressDetailName="locationInfo.addressDetail" />}

      <EmployerRecruitmentRegister setIsOpenJobModal={setIsOpenJobModal} setIsOpenBenefitsModal={setIsOpenBenefitsModal}>
        <RecruitmentRegisterProgressMenu>
          <Button
            label="공고 생성"
            variant="primary"
            margin="0 0 10px 0"
            onClick={methods.handleSubmit(onSubmit, onError)}
            type="submit"
            isLoading={methods.formState.isSubmitting}
          />

          <Button label="임시저장" variant="tertiary" onClick={fetchDraftRecruitment} margin="0 0 10px 0" isLoading={isDisabled} />
        </RecruitmentRegisterProgressMenu>
      </EmployerRecruitmentRegister>
      {/* <FormDevTools control={methods.control} /> */}
    </FormProvider>
  );
}
