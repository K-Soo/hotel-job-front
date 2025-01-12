import styled from 'styled-components';
import HorizontalFormWrapper from '@/components/common/form/HorizontalFormWrapper';
import FormInputB from '@/components/common/form/FormInputB';
import FormCheckbox from '@/components/common/form/FormCheckbox';
import { CreateRecruitmentForm } from '@/types';

export default function RecruitmentDetailManagerForm() {
  return (
    <S.RecruitmentDetailManagerForm>
      <HorizontalFormWrapper>
        <FormInputB<CreateRecruitmentForm>
          required
          label="담당자명"
          name="managerInfo.managerName"
          placeholder="담당자명"
          maxWidth="450px"
          maxLength={10}
        />
        <FormCheckbox<CreateRecruitmentForm> label="비공개" name="managerInfo.isNamePrivate" visibleIcon={false} margin="0 0 0 15px" />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper>
        <FormInputB<CreateRecruitmentForm>
          required
          label="연락처"
          name="managerInfo.managerNumber"
          placeholder="연락처"
          maxWidth="450px"
          mask="999-9999-9999"
        />
        <FormCheckbox<CreateRecruitmentForm> label="비공개" name="managerInfo.isNumberPrivate" visibleIcon={false} margin="0 0 0 15px" />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper>
        <FormInputB<CreateRecruitmentForm>
          required
          label="이메일"
          name="managerInfo.managerEmail"
          placeholder="이메일"
          maxWidth="450px"
          maxLength={50}
        />
        <FormCheckbox<CreateRecruitmentForm> label="비공개" name="managerInfo.isEmailPrivate" visibleIcon={false} margin="0 0 0 15px" />
      </HorizontalFormWrapper>
    </S.RecruitmentDetailManagerForm>
  );
}

const S = {
  RecruitmentDetailManagerForm: styled.div``,
};
