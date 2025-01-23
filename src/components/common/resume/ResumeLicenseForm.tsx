import styled from 'styled-components';
import { ResumeDetailForm } from '@/types';
import FormInput from '@/components/common/form/FormInput';
import { useFieldArray } from 'react-hook-form';
import FormMapSelect from '@/components/common/form/FormMapSelect';
import { LICENSE_STAGE } from '@/constants/resume';
import RemoveButton from '@/components/common/style/RemoveButton';

export default function ResumeLicenseForm() {
  const { fields, remove } = useFieldArray<ResumeDetailForm>({ name: 'licenses' });

  return (
    <S.ResumeLicenseForm>
      {fields.map((field, index) => (
        <div key={field.id} className="license-item">
          <FormMapSelect<ResumeDetailForm>
            name={`licenses.${index}.licenseStage`}
            options={LICENSE_STAGE}
            required
            maxWidth="250px"
            margin="0 0 15px 0"
          />
          <div className="license-item__stage">
            <FormInput<ResumeDetailForm>
              name={`licenses.${index}.licenseName`}
              placeholder="자격증 명"
              required
              maxWidth="250px"
              margin="0 15px 0 0"
              maxLength={15}
            />
            <RemoveButton onClick={() => remove(index)} />
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
      flex-direction: column;
      margin-bottom: 15px;
      &__stage {
        width: 100%;
        display: flex;
        align-items: center;
        /* justify-content: space-between; */
      }
      ${(props) => props.theme.media.mobile`
        flex-direction: column-reverse;
      `};
    }
  `,
};
