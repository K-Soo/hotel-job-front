import styled from 'styled-components';
import HorizontalFormWrapper from '@/components/common/form/HorizontalFormWrapper';
import FormInputB from '@/components/common/form/FormInputB';
import FormCheckbox from '@/components/common/form/FormCheckbox';
import { CreateRecruitmentForm } from '@/types';

export default function RecruitmentRegisterBasicForm() {
  return (
    <S.RecruitmentRegisterBasicForm>
      <HorizontalFormWrapper>
        <FormInputB<CreateRecruitmentForm> required label="공고제목" name="recruitmentTitle" placeholder="공고제목" maxLength={30} />
      </HorizontalFormWrapper>
    </S.RecruitmentRegisterBasicForm>
  );
}

const S = {
  RecruitmentRegisterBasicForm: styled.div`
    width: 100%;
  `,
};
