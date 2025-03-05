import styled from 'styled-components';
import HorizontalFormWrapper from '@/components/common/form/HorizontalFormWrapper';
import FormInputB from '@/components/common/form/FormInputB';
import { RecruitmentDetailForm } from '@/types';

interface RecruitmentDetailBasicFormProps {}

export default function RecruitmentDetailBasicForm({}: RecruitmentDetailBasicFormProps) {
  return (
    <S.RecruitmentDetailBasicForm>
      <HorizontalFormWrapper>
        <FormInputB<RecruitmentDetailForm> required label="공고제목" name="recruitmentTitle" placeholder="공고제목" maxLength={30} />
      </HorizontalFormWrapper>
    </S.RecruitmentDetailBasicForm>
  );
}

const S = {
  RecruitmentDetailBasicForm: styled.div`
    width: 100%;
  `,
};
