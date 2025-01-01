import styled from 'styled-components';
import HorizontalFormWrapper from '@/components/common/form/HorizontalFormWrapper';
import FormInputB from '@/components/common/form/FormInputB';
import FormCheckbox from '@/components/common/form/FormCheckbox';

interface RecruitmentRegisterBasicFormProps {}

export default function RecruitmentRegisterBasicForm({}: RecruitmentRegisterBasicFormProps) {
  return (
    <S.RecruitmentRegisterBasicForm>
      <HorizontalFormWrapper>
        <FormInputB<any> required label="공고제목" name="a" placeholder="공고제목" />
      </HorizontalFormWrapper>
    </S.RecruitmentRegisterBasicForm>
  );
}

const S = {
  RecruitmentRegisterBasicForm: styled.div`
    width: 100%;
  `,
};
