import React from 'react';
import styled from 'styled-components';
import { useFieldArray } from 'react-hook-form';
import { ResumeDetailForm } from '@/types';
import ResumeExperienceItem from '@/components/common/resume/ResumeExperienceItem';

export default function ResumeExperienceForm() {
  const { fields, remove } = useFieldArray<ResumeDetailForm>({ name: 'experience' });

  return (
    <S.ResumeExperienceForm>
      {fields.map((field, index) => {
        return <ResumeExperienceItem key={field.id} index={index} remove={remove} />;
      })}
    </S.ResumeExperienceForm>
  );
}

const S = {
  ResumeExperienceForm: styled.div``,
};
