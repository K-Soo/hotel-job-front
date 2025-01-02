import styled from 'styled-components';
import HorizontalFormWrapper from '@/components/common/form/HorizontalFormWrapper';
import FormCheckbox from '@/components/common/form/FormCheckbox';
import FormArrayRadio from '@/components/common/form/FormArrayRadio';
import FormTagBox from '@/components/common/form/FormTagBox';
import FormRadio from '@/components/common/form/FormRadio';
import Button from '@/components/common/style/Button';
import Icon from '@/icons/Icon';
import RecruitmentJobConditionAdditional from '@/components/employerRecruitmentRegister/RecruitmentJobConditionAdditional';
import { useFormContext } from 'react-hook-form';
import { requiredSalaryTypeOptions } from '@/constants/options';
import { SalaryType } from '@/types';
import FormNumberInput from '@/components/common/form/FormNumberInput';
import MinimumWage from '@/components/common/employer/MinimumWage';

interface RecruitmentRegisterJobConditionFormProps {}

export default function RecruitmentRegisterJobConditionForm({}: RecruitmentRegisterJobConditionFormProps) {
  const { watch } = useFormContext();

  const salaryTypeValue = watch('salaryType') as SalaryType;

  return (
    <S.RecruitmentRegisterJobConditionForm>
      <HorizontalFormWrapper label="근무형태" required>
        <FormCheckbox label="정규직" name="정규직" visibleIcon={false} margin="0 30px 0 0" />
        <FormCheckbox label="계약직" name="계약직" visibleIcon={false} margin="0 30px 0 0" />
        <FormCheckbox label="파출" name="파출" visibleIcon={false} margin="0 30px 0 0" />
        <FormCheckbox label="아르바이트" name="아르바이트" visibleIcon={false} margin="0 30px 0 0" />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper label="북리후생" required>
        <FormTagBox name="ㅁㄴㅇ" placeholder="복리후생" maxWidth="378px" />
        <Button
          label="검색"
          variant="select"
          width="120px"
          height="40px"
          margin="0 0 0 15px"
          icon={<Icon name="Plus24x24" color="red" margin="0 5px 0 0" width="16px" height="16px" />}
        />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper label="급여" required border="none">
        <FormArrayRadio options={requiredSalaryTypeOptions} name="salaryType" />
      </HorizontalFormWrapper>

      <S.PriceBox>
        <FormNumberInput<any> name="원" maxWidth="140px" unit="원" />
        <MinimumWage salaryType={salaryTypeValue} />
      </S.PriceBox>

      <HorizontalFormWrapper label="항목추가">
        <RecruitmentJobConditionAdditional />
      </HorizontalFormWrapper>

      <S.AdditionalContainer>
        <div>
          <FormRadio margin="3px" name="jobWorking" label="주 5일 (월~금)" value="WEEKDAYS_5" />
          <FormRadio margin="3px" name="jobWorking" label="주 6일 (월~토)" value="WEEKDAYS_6" />
          <FormRadio margin="3px" name="jobWorking" label="주말 주간 (토, 일)" value="WEEKEND_DAY" />
          <FormRadio margin="3px" name="jobWorking" label="주말 야간 (토, 일)" value="WEEKEND_NIGHT" />
          <FormRadio margin="3px" name="jobWorking" label="야간 고정" value="NIGHT" />
          <FormRadio margin="3px" name="jobWorking" label="면접 후 결정" value="TO_BE_DECIDED" />
        </div>

        <div>
          <FormRadio margin="3px" name="jobWorking" label="2교대 (주주야야)" value="TWO_SHIFT_DAY_DAY_NIGHT_NIGHT" />
          <FormRadio margin="3px" name="jobWorking" label="2교대 (주야비비)" value="TWO_SHIFT_DAY_NIGHT_OFF_OFF" />
          <FormRadio margin="3px" name="jobWorking" label="2교대 (주야주야)" value="TWO_SHIFT_DAY_NIGHT" />
          <FormRadio margin="3px" name="jobWorking" label="3교대 (주주야야비비)" value="THREE_SHIFT_DAY_DAY_NIGHT_NIGHT_OFF_OFF" />
          <FormRadio margin="3px" name="jobWorking" label="3교대 (주야비)" value="THREE_SHIFT_DAY_NIGHT_OFF" />
          <FormRadio margin="3px" name="jobWorking" label="3교대 (오전/오후/심야)" value="THREE_SHIFT_MORNING_AFTERNOON_NIGHT" />
        </div>

        <div>
          <FormRadio margin="3px" name="jobWorking" label="격일제 (24시간 주간 맞교대)" value="ALTERNATE_DAY_SHIFT" />
          <FormRadio margin="3px" name="jobWorking" label="격일제 (24시간 야간 맞교대)" value="ALTERNATE_NIGHT_SHIFT" />
          <FormRadio margin="3px" name="jobWorking" label="격일제 (24시간 근무 2일 휴무)" value="ALTERNATE_2DAY_OFF" />
        </div>
      </S.AdditionalContainer>
    </S.RecruitmentRegisterJobConditionForm>
  );
}

const S = {
  RecruitmentRegisterJobConditionForm: styled.div``,
  PriceBox: styled.div`
    margin-left: 165px;
  `,
  AdditionalContainer: styled.div`
    display: flex;
    padding: 10px 15px;
    background-color: ${(props) => props.theme.colors.gray};
    & > * {
      flex: 1;
    }
  `,
};
