import styled from 'styled-components';
import { ResumeDetailForm } from '@/types';
import FormInput from '@/components/common/form/FormInput';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { LICENSE_STAGE } from '@/constants/resume';
import RemoveButton from '@/components/common/style/RemoveButton';
import DragScroll from '@/components/common/DragScroll';
import FormChipsRadio from '@/components/common/form/FormChipsRadio';
import FormError from '@/components/common/form/FormError';

export default function ResumeLicenseForm() {
  const { fields, remove } = useFieldArray<ResumeDetailForm>({ name: 'licenses' });
  const { formState } = useFormContext<ResumeDetailForm>();

  return (
    <S.ResumeLicenseForm>
      {fields.map((field, index) => (
        <div key={field.id} className="item">
          <div className="flex justify-end">
            <FormInput<ResumeDetailForm>
              name={`licenses.${index}.licenseName`}
              placeholder="자격증 명"
              required
              maxLength={12}
              margin="0 30px 0 0"
            />
            <RemoveButton onClick={() => remove(index)} />
          </div>

          <div className="py-1">
            <DragScroll>
              {Object.entries(LICENSE_STAGE).map(([key, value]) => (
                <FormChipsRadio
                  key={`${field.id}-${key}`}
                  value={key}
                  name={`licenses.${index}.licenseStage`}
                  label={value}
                  margin="0 15px 0 0"
                  palette="green"
                  index={field.id}
                />
              ))}
            </DragScroll>
            <FormError errors={formState.errors} name={`licenses.${index}.licenseStage`} />
          </div>
        </div>
      ))}
    </S.ResumeLicenseForm>
  );
}

const S = {
  ResumeLicenseForm: styled.div`
    .item {
      background-color: ${(props) => props.theme.colors.gray50};
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 15px;
    }
  `,
};
