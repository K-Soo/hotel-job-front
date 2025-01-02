import styled from 'styled-components';
import HorizontalFormWrapper from '@/components/common/form/HorizontalFormWrapper';
import FormInputB from '@/components/common/form/FormInputB';
import FormSelect from '@/components/common/form/FormSelect';
import FormInput from '@/components/common/form/FormInput';
import FormNumberInput from '@/components/common/form/FormNumberInput';
import FormCheckbox from '@/components/common/form/FormCheckbox';
import { useFormContext } from 'react-hook-form';
import RecruitmentDetailAdditional from '@/components/employerRecruitmentRegister/RecruitmentDetailAdditional';
import { educationConditionLevelOptions, optionalPositionOptions } from '@/constants/options';
import Button from '@/components/common/style/Button';

interface RecruitmentRegisterDetailFormProps {
  setIsOpenJobModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RecruitmentRegisterDetailForm({ setIsOpenJobModal }: RecruitmentRegisterDetailFormProps) {
  const { watch } = useFormContext();

  const departmentValue = watch('department');
  const positionValue = watch('position');

  return (
    <S.RecruitmentRegisterDetailForm>
      <HorizontalFormWrapper>
        <FormInputB<any> required label="직무" name="직무" placeholder="직무" />
        <Button label="선택" variant="primary" height="40px" width="100px" margin="0 0 0 15px" onClick={() => setIsOpenJobModal(true)} />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper label="경력" required>
        <FormCheckbox label="경력" name="경력" visibleIcon={false} margin="0 30px 0 0" />
        <FormCheckbox label="신입" name="신입" visibleIcon={false} margin="0 30px 0 0" />
        <FormCheckbox label="경력무관" name="경력무관" visibleIcon={false} margin="0 30px 0 0" />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper label="국적" required>
        <FormCheckbox label="내국인" name="내국인" visibleIcon={false} margin="0 30px 0 0" />
        <FormCheckbox label="외국인" name="외국인" visibleIcon={false} margin="0 30px 0 0" />
        <FormInputB<any> name="결혼비자" placeholder="예시) H-2, F-2, 결혼비자, 영주권" maxWidth="320px" />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper label="모집인원" required>
        <FormNumberInput<any> name="모집인원" placeholder="모집인원" maxWidth="100px" unit="명" />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper label="학력조건">
        <FormSelect name="educationCondition" options={educationConditionLevelOptions} maxWidth="165px" />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper label="항목추가">
        <RecruitmentDetailAdditional />
      </HorizontalFormWrapper>

      {departmentValue && (
        <S.AdditionalContainer>
          {departmentValue && (
            <FormInput<any> label="근무부서" name="department.value" placeholder="근무하게 될 부서 또는 근무지" isFocusing />
          )}
        </S.AdditionalContainer>
      )}

      {positionValue && (
        <S.AdditionalContainer>
          {positionValue && <FormSelect name="position" options={optionalPositionOptions} label="직급" />}
        </S.AdditionalContainer>
      )}
    </S.RecruitmentRegisterDetailForm>
  );
}

const S = {
  RecruitmentRegisterDetailForm: styled.div``,
  AdditionalContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
    padding: 10px 15px;
    background-color: ${(props) => props.theme.colors.gray};
  `,
};
