import styled from 'styled-components';
import HorizontalFormWrapper from '@/components/common/form/HorizontalFormWrapper';
import FormInputB from '@/components/common/form/FormInputB';
import FormCheckbox from '@/components/common/form/FormCheckbox';

interface RecruitmentRegisterManagerFormProps {}

export default function RecruitmentRegisterManagerForm({}: RecruitmentRegisterManagerFormProps) {
  return (
    <S.RecruitmentRegisterManagerForm>
      <HorizontalFormWrapper>
        <FormInputB<any> required label="담당자명" name="담당자명" placeholder="담당자명" maxWidth="400px" />
        <FormCheckbox label="비공개" name="담당자명" visibleIcon={false} margin="0 0 0 15px" />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper>
        <FormInputB<any> required label="연락처" name="연락처" placeholder="연락처" maxWidth="400px" />
        <FormCheckbox label="비공개" name="연락처" visibleIcon={false} margin="0 0 0 15px" />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper>
        <FormInputB<any> required label="이메일" name="이메일" placeholder="이메일" maxWidth="400px" />
        <FormCheckbox label="비공개" name="이메일" visibleIcon={false} margin="0 0 0 15px" />
      </HorizontalFormWrapper>
    </S.RecruitmentRegisterManagerForm>
  );
}

const S = {
  RecruitmentRegisterManagerForm: styled.div``,
};
