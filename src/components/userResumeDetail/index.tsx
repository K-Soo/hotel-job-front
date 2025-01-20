import styled from 'styled-components';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ResumeDetailForm, ResumeRegisterForm, ResumeStatusKey } from '@/types';
import ResumeSection from '@/components/common/resume/ResumeSection';
import ResumePolicy from '@/components/common/resume/ResumePolicy';
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
import ResumeTitleForm from '@/components/userResumeDetail/ResumeTitleForm';

interface UserResumeDetailProps {
  status: ResumeStatusKey;
  children: React.ReactNode;
}

export default function UserResumeDetail({ status, children }: UserResumeDetailProps) {
  const { register, watch, setValue, getValues } = useFormContext<ResumeDetailForm>();
  const { fields, remove, append } = useFieldArray<ResumeDetailForm>({ name: 'languages' });
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
    <S.UserResumeDetail>
      <article className="resume-container">
        <ResumeTitleForm name="title" />

        <ResumeProfileSection status={status} />

        <ResumeSection title="간단소개" handleClickAdd={() => {}} visibleAddButton={false} name="summary">
          <FormArea<ResumeDetailForm> name="summary" maxLength={200} />
        </ResumeSection>

        <ResumeSection title="최종 학력" isRequired={true} handleClickAdd={() => {}} visibleAddButton={false} name="education">
          <FormSelect<ResumeDetailForm> name="education" options={resumeEducationLevelOptions} maxWidth="220px" />
        </ResumeSection>

        {/* <ResumeSection title="경력" isRequired={true} handleClickAdd={() => {}} name="experiences">
          <ResumeExperienceForm />
        </ResumeSection> */}

        <ResumeSection title="자격증" handleClickAdd={handleClickAddLicense} name="licenses">
          <ResumeLicenseForm />
        </ResumeSection>

        <ResumeSection title="외국어" handleClickAdd={handleClickAddLanguage}>
          {fields.map((field, index) => (
            <div key={field.id} style={{ display: 'flex' }} className="language-item">
              <FormMapSelect<ResumeDetailForm>
                name={`languages.${index}.name`}
                options={{ '': '선택', ...LANGUAGE }}
                required
                maxWidth="180px"
                margin="0 15px 15px 0"
              />
              <FormMapSelect<ResumeDetailForm>
                name={`languages.${index}.level`}
                options={{ '': '선택', ...LANGUAGE_LEVEL }}
                required
                maxWidth="150px"
                margin="0 15px 15px 0"
              />
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title="병역상태" handleClickAdd={() => {}}>
          <div></div>
        </ResumeSection>

        {status !== 'PUBLISH' && <ResumePolicy />}
      </article>
      {children}
    </S.UserResumeDetail>
  );
}

const S = {
  UserResumeDetail: styled.section`
    display: flex;
    padding-bottom: 100px;
    .resume-container {
      flex: 1;
    }
  `,
};
