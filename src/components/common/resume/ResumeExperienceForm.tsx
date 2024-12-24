import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { ResumeRegisterForm } from '@/types';
import FormInput from '@/components/common/form/FormInput';
import FormSelect from '@/components/common/form/FormSelect';
import FormArea from '@/components/common/form/FormArea';
import FormToggle from '@/components/common/form/FormToggle';
import FormDate from '@/components/common/form/FormDate';
import { jobOptions, positionOptions, salaryTypeOptions } from '@/constants/options';
import { v4 as uuidv4 } from 'uuid';

export default function ResumeExperienceForm() {
  const { watch } = useFormContext<ResumeRegisterForm>();

  const experiencesValue = watch('experiences');

  return (
    <S.ResumeExperienceForm>
      {experiencesValue.map((_, index) => (
        <div key={uuidv4()} className="experience-item">
          <FormInput<ResumeRegisterForm> name={`experiences.${index}.companyName`} placeholder="회사명" label="회사명" required />

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
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
            <FormSelect name={`experiences.${index}.job`} label="직무" options={jobOptions} required margin="0 15px 0 0" maxWidth="220px" />
            <FormSelect name={`experiences.${index}.position`} label="직급/직책" options={positionOptions} maxWidth="180px" />
          </div>

          <FormArea name={`experiences.${index}.responsibility`} label="담당업무" maxLength={200} />

          <FormSelect name={`experiences.${index}.salaryType`} label="급여유형" options={salaryTypeOptions} maxWidth="180px" />
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
