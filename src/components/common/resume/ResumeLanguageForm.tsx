import { ResumeDetailForm } from '@/types';
import styled from 'styled-components';
import FormMapSelect from '@/components/common/form/FormMapSelect';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { LANGUAGE, LANGUAGE_LEVEL } from '@/constants/language';
import RemoveButton from '@/components/common/style/RemoveButton';
import DragScroll from '@/components/common/DragScroll';
import FormChipsRadio from '@/components/common/form/FormChipsRadio';
import FormError from '@/components/common/form/FormError';

export default function ResumeLanguageForm() {
  const { fields, remove } = useFieldArray<ResumeDetailForm>({ name: 'languages' });
  const { formState } = useFormContext<ResumeDetailForm>();

  return (
    <S.ResumeLanguageForm>
      {fields.map((field, index) => (
        <div key={field.id} className="language-item">
          <div className="flex justify-between">
            <FormMapSelect<ResumeDetailForm>
              name={`languages.${index}.name`}
              options={{ '': '선택', ...LANGUAGE }}
              required
              margin="0 30px 0 0"
              maxWidth="300px"
            />
            <RemoveButton onClick={() => remove(index)} />
          </div>

          <div className="py-1">
            <DragScroll>
              {Object.entries(LANGUAGE_LEVEL).map(([key, value]) => (
                <FormChipsRadio
                  key={`${field.id}-${key}`}
                  value={key}
                  name={`languages.${index}.level`}
                  label={value}
                  margin="0 15px 0 0"
                  palette="gray"
                  index={field.id}
                />
              ))}
            </DragScroll>
            <FormError errors={formState.errors} name={`languages.${index}.level`} />
          </div>
        </div>
      ))}
    </S.ResumeLanguageForm>
  );
}

const S = {
  ResumeLanguageForm: styled.div`
    .language-item {
      background-color: ${(props) => props.theme.colors.gray50};
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 15px;
    }
  `,
};
