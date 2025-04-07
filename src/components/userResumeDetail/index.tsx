import styled from 'styled-components';
import { Path, useFormContext } from 'react-hook-form';
import ResumeSection from '@/components/common/resume/ResumeSection';
import ResumePreviewSection from '@/components/common/resume/ResumePreviewSection';
import ResumePolicy from '@/components/common/resume/ResumePolicy';
import ResumeProfileSection from '@/components/common/resume/ResumeProfileSection';
import ResumeProfileSectionPreview from '@/components/userResumeDetail/ResumeProfileSectionPreview';
import ResumeExperienceForm from '@/components/common/resume/ResumeExperienceForm';
import ResumeLicenseForm from '@/components/common/resume/ResumeLicenseForm';
import ResumeLanguageForm from '@/components/common/resume/ResumeLanguageForm';
import FormChipsRadio from '@/components/common/form/FormChipsRadio';
import FormArea from '@/components/common/form/FormArea';
import useToast from '@/hooks/useToast';
import ResumeExperienceSectionPreview from '@/components/userResumeDetail/ResumeExperienceSectionPreview';
import ResumeLicenseSectionPreview from '@/components/userResumeDetail/ResumeLicenseSectionPreview';
import ResumeLanguagesSectionPreview from '@/components/userResumeDetail/ResumeLanguagesSectionPreview';
import ResumeEducationSectionPreview from '@/components/userResumeDetail/ResumeEducationSectionPreview';
import { useResumeContext } from '@/context/ResumeProvider';
import ResumeAddItemButton from '@/components/common/resume/ResumeAddItemButton';
import ResumeFormTitle from '@/components/common/resume/ResumeFormTitle';
import Line from '@/components/common/Line';
import { EDUCATION_LEVEL } from '@/constants';
import DragScroll from '@/components/common/DragScroll';
import FormError from '@/components/common/form/FormError';
import PreviewNotice from '@/components/common/resume/resumePreview/PreviewNotice';
import PreviewSign from '@/components/common/resume/resumePreview/PreviewSign';
import { ResumeDetailForm } from '@/types';
import React from 'react';

interface UserResumeDetailProps {
  children: React.ReactNode;
}

const availableEducationLevelOptions = Object.entries(EDUCATION_LEVEL).filter(([key]) => key !== 'NOT_REQUIRED');

export default function UserResumeDetail({ children }: UserResumeDetailProps) {
  const { resumeStatus, isEditing } = useResumeContext();
  const {
    watch,
    setValue,
    getValues,
    setFocus,
    formState: { errors },
  } = useFormContext<ResumeDetailForm>();

  React.useEffect(() => {
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      // setFocus(firstErrorField as Path<ResumeDetailForm>);
    }
  }, [errors]);

  const { addToast } = useToast();

  const licensesValue = watch('licenses');
  const languagesValue = watch('languages');
  const experienceValue = watch('experience');
  const nameValue = watch('name');

  const handleClickLanguage = () => {
    if (languagesValue.length >= 9) {
      return addToast({ message: '최대 9개까지 선택 가능합니다.', type: 'warning' });
    }

    setValue('languages', [...languagesValue, { name: null as any, level: null as any }]);
  };

  const handleClickLicense = () => {
    if (licensesValue.length >= 30) {
      return addToast({ message: '최대 30개까지 선택 가능합니다.', type: 'warning' });
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
        {/* 기본정보 */}
        {isEditing && (
          <ResumeSection title="기본 정보" subTitle="저는 이런 사람이에요" isVisibleHeader={false}>
            <ResumeProfileSection />

            <Line color="#FFFFFF" margin="30px 0" />

            <ResumeFormTitle title="자기소개" required />
            <FormArea<ResumeDetailForm> name="summary" maxLength={500} />
          </ResumeSection>
        )}
        {!isEditing && <ResumeProfileSectionPreview />}

        {/* 교육 및 경력 */}
        {isEditing && (
          <ResumeSection
            title="교육 및 경력"
            subTitle="저는 이런 경험이 있어요"
            headerBackground="linear-gradient(to right, #2272eb 0%, #2272eb 30%, #64a8ff 100%)"
          >
            <ResumeFormTitle title="학력" required />
            <DragScroll>
              {availableEducationLevelOptions.map(([key, value], index) => (
                <FormChipsRadio
                  key={key}
                  value={key}
                  name="education"
                  label={value}
                  margin="0 15px 0 0"
                  palette="blue"
                  focusOnError={index === 0}
                />
              ))}
            </DragScroll>

            <FormError errors={errors} name="education" />

            <Line color="#FFFFFF" margin="30px 0" />

            <ResumeFormTitle title="경력" />
            <ResumeExperienceForm />
            <ResumeAddItemButton label="경력 추가" maxLength={10} variant="blue" onClick={handleClickExperiences} />
          </ResumeSection>
        )}
        {!isEditing && (
          <ResumePreviewSection title="학력">
            <ResumeEducationSectionPreview />
          </ResumePreviewSection>
        )}
        {!isEditing && experienceValue.length !== 0 && (
          <ResumePreviewSection title="경력">
            <ResumeExperienceSectionPreview />
          </ResumePreviewSection>
        )}

        {/* 보유역량 */}
        {isEditing && (
          <ResumeSection
            title="보유역량"
            subTitle="저는 이런 역량이 있어요"
            headerBackground="linear-gradient(to right, #9fe1b3 0%, #51b250 50%, #9fe1b3 100%)"
          >
            <ResumeFormTitle title="자격증" />
            <ResumeLicenseForm />
            <ResumeAddItemButton label="자격증 추가" maxLength={30} variant="green" onClick={handleClickLicense} />

            <Line color="#FFFFFF" margin="30px 0" />

            <ResumeFormTitle title="외국어" />
            <ResumeLanguageForm />
            <ResumeAddItemButton label="외국어 추가" maxLength={9} variant="gray" onClick={handleClickLanguage} />
          </ResumeSection>
        )}
        {!isEditing && licensesValue.length !== 0 && (
          <ResumePreviewSection title="자격증">
            <ResumeLicenseSectionPreview />
          </ResumePreviewSection>
        )}
        {!isEditing && licensesValue.length !== 0 && (
          <ResumePreviewSection title="외국어">
            <ResumeLanguagesSectionPreview />
          </ResumePreviewSection>
        )}

        <div className="bg-white px-4 pt-10 pb-10">
          {resumeStatus !== 'PUBLISH' && <ResumePolicy />}
          <PreviewSign name={nameValue} />
          <PreviewNotice />
        </div>
      </article>
      {children}
    </S.UserResumeDetail>
  );
}

const S = {
  UserResumeDetail: styled.section`
    display: flex;
    justify-content: center;
    padding-bottom: 50px;
    background-color: ${(props) => props.theme.colors.gray50};
    padding-top: 30px;
    ${(props) => props.theme.media.tablet`
      padding-top: 0;
    `};
    .resume-container {
      max-width: 768px;
      width: 100%;
    }
  `,
  TitleSectionName: styled.div`
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 5px;
  `,
  ResumePreviewNotice: styled.div`
    background-color: ${({ theme }) => theme.colors.gray100};
    padding: 20px;
    margin-top: 20px;
    border-radius: 8px;
  `,
};
