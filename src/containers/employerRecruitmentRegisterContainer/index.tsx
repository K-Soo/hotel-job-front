import React from 'react';
import EmployerRecruitmentRegister from '@/components/employerRecruitmentRegister';
import { useForm, FormProvider, SubmitHandler, useFormContext } from 'react-hook-form';
import FormDevTools from '@/components/common/FormDevTools';
import JobModal from '@/components/common/employer/JobModal';

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

  const methods = useForm<any>({
    // resolver: yupResolver(schema.businessForm),
    // disabled: disabled,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      users: [],
      job: [],
      department: undefined,
      preferences: undefined, // 우대조건
      salaryType: undefined, //급여 타입
      workingDay: undefined, //근무요일
    },
  });

  console.log('methods: ', methods.watch());
  return (
    <>
      <FormProvider {...methods}>
        {isOpenJobModal && <JobModal name="job" setIsOpenJobModal={setIsOpenJobModal} />}
        <EmployerRecruitmentRegister setIsOpenJobModal={setIsOpenJobModal} />
        <FormDevTools control={methods.control} />
      </FormProvider>
    </>
  );
}
