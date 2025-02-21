import styled from 'styled-components';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ResumeDetailForm } from '@/types';
import ResumeSection from '@/components/common/resume/ResumeSection';
import ResumePolicy from '@/components/common/resume/ResumePolicy';
import ResumeProfileSection from '@/components/common/resume/ResumeProfileSection';
import ResumeProfileSectionPreview from '@/components/userResumeDetail/ResumeProfileSectionPreview';
import ResumeExperienceForm from '@/components/common/resume/ResumeExperienceForm';
import ResumeLicenseForm from '@/components/common/resume/ResumeLicenseForm';
import ResumeLanguageForm from '@/components/common/resume/ResumeLanguageForm';
import FormSelect from '@/components/common/form/FormSelect';
import { resumeEducationLevelOptions } from '@/constants/options';
import FormArea from '@/components/common/form/FormArea';
import useToast from '@/hooks/useToast';
import ResumeTitleForm from '@/components/userResumeDetail/ResumeTitleForm';
import ResumePrevuesNavigation from '@/components/userResumeDetail/ResumePrevuesNavigation';
import ResumeSummarySectionPreview from '@/components/userResumeDetail/ResumeSummarySectionPreview';
import ResumeExperienceSectionPreview from '@/components/userResumeDetail/ResumeExperienceSectionPreview';
import ResumeLicenseSectionPreview from '@/components/userResumeDetail/ResumeLicenseSectionPreview';
import ResumeLanguagesSectionPreview from '@/components/userResumeDetail/ResumeLanguagesSectionPreview';
import ResumeEducationSectionPreview from '@/components/userResumeDetail/ResumeEducationSectionPreview';
import { useResumeContext } from '@/context/ResumeProvider';

interface UserResumeDetailProps {
  children: React.ReactNode;
}

export default function UserResumeDetail({ children }: UserResumeDetailProps) {
  const { resumeStatus, isEditing } = useResumeContext();
  const { watch, setValue, getValues } = useFormContext<ResumeDetailForm>();
  const { fields, append } = useFieldArray<ResumeDetailForm>({ name: 'languages' });

  const { addToast } = useToast();

  const careerLevelValue = watch('careerLevel');
  const summaryValue = watch('summary');
  const licensesValue = watch('licenses');
  const languagesValue = watch('languages');

  const handleClickAddLanguage = () => {
    if (languagesValue.length >= 4) {
      return addToast({ message: '최대 4개까지 선택 가능합니다.', type: 'warning' });
    }

    setValue('languages', [...languagesValue, { name: null as any, level: null as any }]);
  };

  const handleClickAddLicense = () => {
    if (licensesValue.length >= 10) {
      return addToast({ message: '최대 10개까지 선택 가능합니다.', type: 'warning' });
    }
    setValue('licenses', [...licensesValue, { licenseName: '', licenseStage: 'FINAL' }]);
  };

  const handleClickExperiences = () => {
    const values = getValues('experience');

    setValue('experience', [
      ...values,
      {
        companyName: '',
        startDate: new Date(),
        endDate: null,
        isEmployed: false,
        job: null as any,
        position: null,
        responsibility: '',
        reasonForLeaving: '',
      },
    ]);
  };

  return (
    <S.UserResumeDetail>
      <article className="resume-container">
        <ResumePrevuesNavigation />

        <ResumeTitleForm name="title" />

        {/* 기본정보 */}
        {isEditing && (
          <ResumeSection title="기본정보" visibleAddButton={false}>
            <ResumeProfileSection />
          </ResumeSection>
        )}
        {!isEditing && <ResumeProfileSectionPreview />}

        {/* 간단소개 */}
        {isEditing && (
          <ResumeSection title="간단소개" visibleAddButton={false} name="summary">
            <FormArea<ResumeDetailForm> name="summary" maxLength={500} />
          </ResumeSection>
        )}
        {!isEditing && summaryValue.length !== 0 && (
          <ResumeSection title="간단소개" visibleAddButton={false} name="summary">
            <ResumeSummarySectionPreview text={summaryValue} />
          </ResumeSection>
        )}

        {/* 최종학력 */}
        {isEditing && (
          <ResumeSection title="최종 학력" isRequired={isEditing ? true : false} visibleAddButton={false} name="education">
            <FormSelect<ResumeDetailForm> name="education" options={resumeEducationLevelOptions} maxWidth="220px" />
          </ResumeSection>
        )}
        {!isEditing && (
          <ResumeSection title="최종 학력" isRequired={false} visibleAddButton={false} name="education">
            <ResumeEducationSectionPreview />
          </ResumeSection>
        )}

        {/* 경력 */}
        {isEditing && (
          <ResumeSection
            title="경력"
            isRequired={careerLevelValue === 'EXPERIENCED' ? true : false}
            handleClickAdd={handleClickExperiences}
            name="experiences"
            visibleAddButton={isEditing ? true : false}
          >
            <ResumeExperienceForm />
          </ResumeSection>
        )}
        {!isEditing && (
          <ResumeSection title="경력" isRequired={false} name="experiences" visibleAddButton={false}>
            <ResumeExperienceSectionPreview />
          </ResumeSection>
        )}

        {/* 자격증 */}
        {isEditing && (
          <ResumeSection title="자격증" handleClickAdd={handleClickAddLicense} name="licenses" visibleAddButton={isEditing ? true : false}>
            <ResumeLicenseForm />
          </ResumeSection>
        )}
        {!isEditing && licensesValue.length !== 0 && (
          <ResumeSection title="자격증" name="licenses" visibleAddButton={false}>
            <ResumeLicenseSectionPreview />
          </ResumeSection>
        )}

        {/* 외국어 */}
        {isEditing && (
          <ResumeSection title="외국어" handleClickAdd={handleClickAddLanguage} visibleAddButton={isEditing ? true : false}>
            <ResumeLanguageForm />
          </ResumeSection>
        )}
        {!isEditing && languagesValue.length !== 0 && (
          <ResumeSection title="외국어" visibleAddButton={isEditing ? true : false}>
            <ResumeLanguagesSectionPreview />
          </ResumeSection>
        )}

        {/* <ResumeSection title="병역상태" >
          <div></div>
          </ResumeSection> */}

        {resumeStatus !== 'PUBLISH' && <ResumePolicy />}
      </article>
      {children}
    </S.UserResumeDetail>
  );
}

const S = {
  UserResumeDetail: styled.section`
    display: flex;
    padding-bottom: 50px;
    .resume-container {
      flex: 1;
    }
  `,
};
