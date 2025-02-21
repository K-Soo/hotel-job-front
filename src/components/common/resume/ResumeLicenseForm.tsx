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
        <div key={field.id} className="item">
          <div className="item__wrapper">
            <FormInput<ResumeDetailForm>
              name={`licenses.${index}.licenseName`}
              placeholder="자격증 명"
              required
              maxWidth="200px"
              maxLength={12}
              errorPosition="static"
              margin="0 0 2px 0"
            />
            <FormMapSelect<ResumeDetailForm>
              name={`licenses.${index}.licenseStage`}
              options={LICENSE_STAGE}
              required
              maxWidth="200px"
              margin="0"
            />
          </div>
          <RemoveButton onClick={() => remove(index)} />
        </div>
      ))}
    </S.ResumeLicenseForm>
  );
}

const S = {
  ResumeLicenseForm: styled.div`
    .item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      background-color: ${(props) => props.theme.colors.gray};
      padding: 10px;
      border-radius: 5px;
      &__wrapper {
        width: 100%;
        height: 100%;
      }
    }
  `,
};
