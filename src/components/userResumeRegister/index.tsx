import styled from 'styled-components';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ResumeRegisterForm } from '@/types';
import ResumeSection from '@/components/common/resume/ResumeSection';
import ResumePolicy from '@/components/common/resume/ResumePolicy';
import ResumeProgress from '@/components/common/resume/ResumeProgress';
import ResumeProfileSection from '@/components/common/resume/ResumeProfileSection';

import ResumeExperienceForm from '@/components/common/resume/ResumeExperienceForm';
import ResumeLicenseForm from '@/components/common/resume/ResumeLicenseForm';

import FormInput from '@/components/common/form/FormInput';
import FormInputB from '@/components/common/form/FormInputB';
import FormSelect from '@/components/common/form/FormSelect';
import FormMapSelect from '@/components/common/form/FormMapSelect';
import FormToggle from '@/components/common/form/FormToggle';
import { educationConditionLevelOptions, languageOptions, resumeEducationLevelOptions, salaryTypeOptions } from '@/constants/options';
import FormArea from '@/components/common/form/FormArea';
import { LANGUAGE, LANGUAGE_LEVEL } from '@/constants/language';
import useToast from '@/hooks/useToast';

interface UserResumeRegisterProps {
  children: React.ReactNode;
  handleClickAdd: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function UserResumeRegister({ handleClickAdd, children }: UserResumeRegisterProps) {
  const { register, watch, setValue, getValues } = useFormContext<ResumeRegisterForm>();
  const { fields, remove, append } = useFieldArray<ResumeRegisterForm>({ name: 'languages' });
  const { addToast } = useToast();

  const handleClickAddLanguage = () => {
    if (fields.length >= 4) {
      return addToast({ message: '최대 4개까지 선택 가능합니다.', type: 'warning' });
    }
    append({ name: null, level: null });
  };

  const handleClickAddLicense = () => {
    const values = getValues('licenses');

    setValue('licenses', [
      ...values,
      {
        licenseName: '',
        licenseStage: 'FINAL',
      },
    ]);
  };

  return (
    <S.UserResumeRegister>
      <article className="resume-container">
        <FormInput<ResumeRegisterForm> name="title" placeholder="이력서 제목을 입력해주세요." margin="0 0 15px 0" />

        {/* <FormSelect<ResumeRegisterForm> name="careerLevel" label="신입" options={salaryTypeOptions} required maxWidth="220px" /> */}

        <ResumeProfileSection />

        <ResumeSection title="간단소개" handleClickAdd={handleClickAdd} visibleAddButton={false} name="summary">
          <FormArea<ResumeRegisterForm> name="summary" maxLength={200} />
        </ResumeSection>

        <ResumeSection title="최종 학력" isRequired={true} handleClickAdd={handleClickAdd} visibleAddButton={false} name="education">
          <FormSelect<ResumeRegisterForm> name="education" options={resumeEducationLevelOptions} maxWidth="220px" />
          {/* <FormToggle<ResumeRegisterForm> label="재직중" name={``} /> */}
        </ResumeSection>

        <ResumeSection title="경력" isRequired={true} handleClickAdd={handleClickAdd} name="experiences">
          <ResumeExperienceForm />
        </ResumeSection>

        {/* TODO - 경력 기술서 */}
        {/* <ResumeSection title="경력기술서" handleClickAdd={handleClickAdd}>
          <div></div>
        </ResumeSection> */}

        <ResumeSection title="자격증" handleClickAdd={handleClickAddLicense} name="licenses">
          <ResumeLicenseForm />
        </ResumeSection>

        <ResumeSection title="외국어" handleClickAdd={handleClickAddLanguage}>
          {fields.map((field, index) => (
            <div key={field.id} style={{ display: 'flex' }} className="language-item">
              <FormMapSelect<ResumeRegisterForm>
                name={`languages.${index}.name`}
                options={{ '': '선택', ...LANGUAGE }}
                required
                maxWidth="180px"
                margin="0 15px 15px 0"
              />
              <FormMapSelect<ResumeRegisterForm>
                name={`languages.${index}.level`}
                options={{ '': '선택', ...LANGUAGE_LEVEL }}
                required
                maxWidth="150px"
                margin="0 15px 15px 0"
              />
            </div>
          ))}
        </ResumeSection>

        {/* 본인인증 -> 성별에따라 분기처리  */}
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
    .resume-container {
      flex: 1;
    }
  `,
};
