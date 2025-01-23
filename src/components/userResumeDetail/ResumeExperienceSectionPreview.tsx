import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { ResumeDetailForm, ResumeRegisterForm } from '@/types';

export default function ResumeExperienceSectionPreview() {
  const { getValues } = useFormContext<ResumeDetailForm>();
  const experienceValue = getValues('experience');

  return (
    <S.ResumeExperienceSectionPreview>
      {experienceValue.map((experience, index) => (
        <div className="item" key={index}>
          <div>
            <div>{}</div>
            <div></div>
          </div>
          <div></div>
        </div>
      ))}
    </S.ResumeExperienceSectionPreview>
  );
}

const S = {
  ResumeExperienceSectionPreview: styled.div``,
};
