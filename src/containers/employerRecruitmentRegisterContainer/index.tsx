import React from 'react';
import EmployerRecruitmentRegister from '@/components/employerRecruitmentRegister';
import { useForm, FormProvider, SubmitHandler, useFormContext } from 'react-hook-form';
import FormDevTools from '@/components/common/FormDevTools';
import dynamic from 'next/dynamic';
import RecruitmentRegisterProgressMenu from '@/components/employerRecruitmentRegister/RecruitmentRegisterProgressMenu';
import useAuth from '@/hooks/useAuth';
import { CreateRecruitmentForm } from '@/types';
import { Post } from '@/apis';
import { schema } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import useToast from '@/hooks/useToast';
import path from '@/constants/path';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/constants/queryKeys';
import { DevTool } from '@hookform/devtools';
import Button from '@/components/common/style/Button';
import useLoading from '@/hooks/useLoading';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';

// const DynamicJobModal = dynamic(() => import('@/components/common/employer/JobModal'), { ssr: false });

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
  const [isDisabled, setIsDisabled] = React.useState(false);

  const { addToast } = useToast();
  const { setLoadingAtomStatue } = useLoading();
  const { setAlertWithConfirmAtom } = useAlertWithConfirm();

  const router = useRouter();
  const queryClient = useQueryClient();

  const methods = useForm<CreateRecruitmentForm>({
    resolver: yupResolver(schema.recruitmentSchema, {
      // abortEarly: false,
    }),
    disabled: false,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      recruitmentTitle: '',
      recruitmentStatus: 'DRAFT',
      // 모집내용
      recruitmentInfo: {
        experienceCondition: undefined,
        nationality: {
          korean: false,
          foreigner: false,
          marriageVisa: '',
        },
        recruitmentCapacity: 0,
        educationCondition: 'NOT_REQUIRED',
      },

      // recruitmentStatus: undefined,
      // users: [],
      // job: [],
      // department: undefined,
      // preferences: undefined, // 우대조건
      // salaryType: undefined, //급여 타입
      // workingDay: undefined, //근무요일
    },
  });

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

      setAlertWithConfirmAtom((prev) => ({
        ...prev,
        type: 'ALERT',
        title: 'TITLE_3',
        subTitle: 'DESC_3',
        confirmLabel: '확인',
        onClickConfirm: () => router.replace(path.EMPLOYER_RECRUITMENT),
      }));
    } catch (error) {
      alert('공고생성 실패');
    } finally {
      setIsDisabled(false);
    }
  };

  // fetch - 임시저장
  const fetchDraftRecruitment = async () => {
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

      router.replace(`${path.EMPLOYER_RECRUITMENT}/${response.result.id}`);
    } catch (error) {
      alert('임시저장 실패');
    }
  };

  return (
    <FormProvider {...methods}>
      {/* {isOpenJobModal && <DynamicJobModal name="job" setIsOpenJobModal={setIsOpenJobModal} />} */}
      <EmployerRecruitmentRegister setIsOpenJobModal={setIsOpenJobModal}>
        <RecruitmentRegisterProgressMenu fetchDraftRecruitment={fetchDraftRecruitment}>
          <Button
            label="공고 생성"
            variant="primary"
            margin="0 0 10px 0"
            onClick={methods.handleSubmit(onSubmit)}
            type="button"
            isLoading={methods.formState.isSubmitting}
          />
        </RecruitmentRegisterProgressMenu>
      </EmployerRecruitmentRegister>
      <DevTool control={methods.control} />
    </FormProvider>
  );
}
