import styled from 'styled-components';
import FormCheckbox from '@/components/common/form/FormCheckbox';
import CheckBox from '@/components/common/style/CheckBox';
import Line from '@/components/common/Line';
import { ResumeRegisterForm } from '@/types';
import { useFormContext } from 'react-hook-form';

interface ResumePolicyProps {}

export default function ResumePolicy({}: ResumePolicyProps) {
  const { watch, clearErrors, setValue } = useFormContext();

  const allChecked = watch(['isRequiredAgreement', 'isOptionalAgreement']).every((value) => value);

  const handleCheckAllChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    clearErrors(['isRequiredAgreement', 'isOptionalAgreement']);

    if (checked) {
      setValue('isRequiredAgreement', true);
      setValue('isOptionalAgreement', true);
      return;
    }
    setValue('isRequiredAgreement', false);
    setValue('isOptionalAgreement', false);
  };

  return (
    <S.ResumePolicy>
      <h5 className="mb-8 text-center align-middle text-[22px]">이력서 동의</h5>
      <CheckBox
        name="all"
        label="모두 동의합니다.(이력서 작성을 위한 개인정보 수집동의)"
        checked={allChecked}
        onChange={handleCheckAllChecked}
      />

      <Line />

      <FormCheckbox<ResumeRegisterForm>
        name="isRequiredAgreement"
        required
        label="필수 항목에 대한 개인정보 수집 및 이용 동의"
        margin="0 0 20px 0"
        visibleIcon={false}
      />
      <FormCheckbox<ResumeRegisterForm>
        name="isOptionalAgreement"
        required
        label="선택 항목에 대한 개인정보 수집 및 이용 동의"
        visibleIcon={false}
      />
    </S.ResumePolicy>
  );
}

const S = {
  ResumePolicy: styled.div`
    padding: 15px;
    margin: 30px 0;
    ${(props) => props.theme.media.tablet`
      padding: 15px 10px;
    `};
  `,
};
