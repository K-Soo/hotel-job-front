import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { ResumeDetailForm } from '@/types';
import { EDUCATION_LEVEL } from '@/constants';

export default function ResumeEducationSectionPreview() {
  const { getValues } = useFormContext<ResumeDetailForm>();
  const educationValue = getValues('education');

  return (
    <S.ResumeEducationSectionPreview>
      <p className="preview-education">{EDUCATION_LEVEL[educationValue]} 졸업</p>
    </S.ResumeEducationSectionPreview>
  );
}

const S = {
  ResumeEducationSectionPreview: styled.div`
    .preview-education {
      padding-top: 10px;
    }
  `,
};
