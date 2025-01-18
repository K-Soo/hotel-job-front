import React from 'react';
import styled from 'styled-components';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ResumeRegisterForm } from '@/types';
import FormInput from '@/components/common/form/FormInput';
import FormSelect from '@/components/common/form/FormSelect';
import FormArea from '@/components/common/form/FormArea';
import FormToggle from '@/components/common/form/FormToggle';
import FormDate from '@/components/common/form/FormDate';
import Button from '@/components/common/style/Button';
import { optionalJobOptions, positionOptions, salaryTypeOptions } from '@/constants/options';
import { v4 as uuidv4 } from 'uuid';

export default function ResumeExperienceForm() {
  const [isOnResignationReason, setIsOnResignationReason] = React.useState(false);
  const { watch } = useFormContext<ResumeRegisterForm>();
  const { fields } = useFieldArray({ name: 'experiences' });

  const experiencesValue = watch('experiences');
  console.log('experiencesValue: ', experiencesValue);

  return (
    <S.ResumeExperienceForm>
      {fields.map((field, index) => (
        <div key={field.id} className="experience-item">
          <FormInput<ResumeRegisterForm>
            name={`experiences.${index}.companyName`}
            placeholder="회사명"
            label="회사명"
            required
            maxLength={30}
            margin="0 0 15px 0"
          />

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <FormDate<ResumeRegisterForm>
              maxWidth="120px"
              name={`experiences.${index}.startDate`}
              label="입사년월"
              margin="0 15px 0 0"
              required
            />
            <FormDate<ResumeRegisterForm> maxWidth="120px" name={`experiences.${index}.endDate`} label="퇴사년월" margin="0 10px 0 0" />
            <FormToggle<ResumeRegisterForm> label="재직중" name={`experiences.${index}.isEmployed`} />
          </div>

          <div style={{ display: 'flex' }}>
            <FormSelect
              name={`experiences.${index}.job`}
              label="직무"
              options={optionalJobOptions}
              required
              margin="0 15px 0 0"
              maxWidth="200px"
            />
            <FormSelect name={`experiences.${index}.position`} label="직급/직책" options={positionOptions} maxWidth="180px" />
          </div>

          <FormArea name={`experiences.${index}.responsibility`} label="담당업무" maxLength={200} />

          {isOnResignationReason && (
            <FormSelect name={`experiences.${index}.salaryType`} options={salaryTypeOptions} maxWidth="130px" margin="30px 0 0 0" />
          )}
          <Button
            label="퇴사사유"
            variant="secondary100"
            width="90px"
            height="35px"
            fontSize="14px"
            onClick={() => setIsOnResignationReason((prev) => !prev)}
          />
        </div>
      ))}
    </S.ResumeExperienceForm>
  );
}

const S = {
  ResumeExperienceForm: styled.div`
    .experience-item {
      border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
      padding-top: 30px;
      padding-bottom: 30px;
      &:first-child {
        padding-top: 0;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  `,
};
