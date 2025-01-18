import styled from 'styled-components';
import { ResumeRegisterForm } from '@/types';
// import { v4 as uuidv4 } from 'uuid';
import FormInput from '@/components/common/form/FormInput';
import FormDate from '@/components/common/form/FormDate';
import ResumeDeleteButton from '@/components/userResumeDetail/ResumeDeleteButton';
import { useFormContext, useFieldArray } from 'react-hook-form';
import FormMapSelect from '@/components/common/form/FormMapSelect';
import { LICENSE_STAGE } from '@/constants/resume';

export default function ResumeLicenseForm() {
  const { fields, remove } = useFieldArray<ResumeRegisterForm>({ name: 'licenses' });

  return (
    <S.ResumeLicenseForm>
      {fields.map((field, index) => (
        <div key={field.id} className="license-item">
          <FormInput<ResumeRegisterForm>
            name={`licenses.${index}.licenseName`}
            placeholder="자격증 명"
            required
            maxWidth="250px"
            margin="0 15px 0 0"
          />
          <div className="license-item__stage">
            {/* <FormDate<ResumeRegisterForm> name={`licenses.${index}.licenseStage`} required width="150px" placeholder="취득일" /> */}
            <FormMapSelect<ResumeRegisterForm>
              name={`licenses.${index}.licenseStage`}
              options={LICENSE_STAGE}
              required
              maxWidth="200px"
              margin="0 15px 0 0"
            />
            <ResumeDeleteButton onClick={() => remove(index)} />
          </div>
        </div>
      ))}
    </S.ResumeLicenseForm>
  );
}

const S = {
  ResumeLicenseForm: styled.div`
    .license-item {
      display: flex;
      &__stage {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      ${(props) => props.theme.media.mobile`
        flex-direction: column-reverse;
      `};
    }
  `,
};
