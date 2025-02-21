import { ResumeDetailForm } from '@/types';
import styled from 'styled-components';
import FormMapSelect from '@/components/common/form/FormMapSelect';
import { useFieldArray } from 'react-hook-form';
import { LANGUAGE, LANGUAGE_LEVEL } from '@/constants/language';
import RemoveButton from '@/components/common/style/RemoveButton';

export default function ResumeLanguageForm() {
  const { fields, remove } = useFieldArray<ResumeDetailForm>({ name: 'languages' });
  console.log('@@: ', fields);

  return (
    <S.ResumeLanguageForm>
      {fields.map((field, index) => (
        <div key={field.id} style={{ display: 'flex' }} className="item">
          <div className="item__wrapper">
            <FormMapSelect<ResumeDetailForm>
              name={`languages.${index}.name`}
              options={{ '': '선택', ...LANGUAGE }}
              required
              maxWidth="200px"
              margin="0 0 15px 0"
            />
            <FormMapSelect<ResumeDetailForm>
              name={`languages.${index}.level`}
              options={{ '': '선택', ...LANGUAGE_LEVEL }}
              required
              maxWidth="200px"
            />
          </div>
          <RemoveButton onClick={() => remove(index)} />
        </div>
      ))}
    </S.ResumeLanguageForm>
  );
}

const S = {
  ResumeLanguageForm: styled.div`
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
