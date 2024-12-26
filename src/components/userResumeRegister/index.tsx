import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { ResumeRegisterForm } from '@/types';
import ResumeSection from '@/components/common/resume/ResumeSection';
import ResumePolicy from '@/components/common/resume/ResumePolicy';
import ResumeProgress from '@/components/common/resume/ResumeProgress';
import ResumeProfileSection from '@/components/common/resume/ResumeProfileSection';

import ResumeExperienceForm from '@/components/common/resume/ResumeExperienceForm';
import ResumeLicenseForm from '@/components/common/resume/ResumeLicenseForm';

import FormInput from '@/components/common/form/FormInput';
import FormSelect from '@/components/common/form/FormSelect';
import FormToggle from '@/components/common/form/FormToggle';
import { salaryTypeOptions } from '@/constants/options';
import FormArea from '@/components/common/form/FormArea';

interface UserResumeRegisterProps {
  children: React.ReactNode;
  handleClickAdd: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function UserResumeRegister({ handleClickAdd, children }: UserResumeRegisterProps) {
  const { register, watch, setValue, getValues } = useFormContext<ResumeRegisterForm>();

  const handleAddLicense = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;
    const values = getValues('licenses');

    setValue('licenses', [
      ...values,
      {
        licenseName: '',
        licenseStage: undefined,
        dateOfCompletion: new Date(),
      },
    ]);
  };

  return (
    <S.UserResumeRegister>
      <article>
        <FormInput<ResumeRegisterForm> name="title" placeholder="이력서 제목을 입력해주세요." />

        <FormSelect<ResumeRegisterForm> name="careerLevel" label="신입" options={salaryTypeOptions} required maxWidth="220px" />

        <ResumeProfileSection />

        <ResumeSection title="간단소개" handleClickAdd={handleClickAdd} visibleAddButton={false} name="summary">
          <FormArea<ResumeRegisterForm> name="summary" maxLength={200} />
        </ResumeSection>

        <ResumeSection title="학력" isRequired={true} handleClickAdd={handleClickAdd} visibleAddButton={false} name="education">
          <FormSelect<ResumeRegisterForm> name="education" label="최종학력" options={salaryTypeOptions} required maxWidth="220px" />
          {/* <FormToggle<ResumeRegisterForm> label="재직중" name={``} /> */}
        </ResumeSection>

        <ResumeSection title="경력" isRequired={true} handleClickAdd={handleClickAdd} name="experiences">
          <ResumeExperienceForm />
        </ResumeSection>

        <ResumeSection title="경력기술서" handleClickAdd={handleClickAdd}>
          <div></div>
        </ResumeSection>

        <ResumeSection title="자격증" handleClickAdd={handleAddLicense} name="licenses">
          <ResumeLicenseForm />
        </ResumeSection>

        <ResumeSection title="외국어" handleClickAdd={handleClickAdd}>
          <div></div>
        </ResumeSection>

        <ResumeSection title="병역상태" handleClickAdd={handleClickAdd}>
          <div></div>
        </ResumeSection>

        <ResumePolicy />
      </article>
      <ResumeProgress />
      {children}
    </S.UserResumeRegister>
  );
}

const S = {
  UserResumeRegister: styled.div`
    display: flex;
    padding-bottom: 100px;
    article {
      flex: 1;
    }
  `,
};
