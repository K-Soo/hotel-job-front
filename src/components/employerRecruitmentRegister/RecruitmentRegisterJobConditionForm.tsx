import React from 'react';
import styled from 'styled-components';
import HorizontalFormWrapper from '@/components/common/form/HorizontalFormWrapper';
import FormCheckbox from '@/components/common/form/FormCheckbox';
import FormArrayRadio from '@/components/common/form/FormArrayRadio';
import FormTagBox from '@/components/common/form/FormTagBox';
import FormRadio from '@/components/common/form/FormRadio';
import Button from '@/components/common/style/Button';
import Icon from '@/icons/Icon';
import RecruitmentJobConditionAdditional from '@/components/employerRecruitmentRegister/RecruitmentJobConditionAdditional';
import RecruitmentDetailAdditional from '@/components/employerRecruitmentRegister/RecruitmentDetailAdditional';
import { useFormContext } from 'react-hook-form';
import { requiredSalaryTypeOptions } from '@/constants/options';
import { CreateRecruitmentForm, SalaryTypeKeys } from '@/types';
import FormNumberInput from '@/components/common/form/FormNumberInput';
import MinimumWage from '@/components/common/employer/MinimumWage';
import { salaryType } from '@/constants';
import useDidMountEffect from '@/hooks/useDidMountEffect';

interface RecruitmentRegisterJobConditionFormProps {}

export default function RecruitmentRegisterJobConditionForm({}: RecruitmentRegisterJobConditionFormProps) {
  const { watch, setValue, setFocus, clearErrors } = useFormContext<CreateRecruitmentForm>();

  const salaryTypeValue = watch('conditionInfo.salaryType') as SalaryTypeKeys;
  const employmentTypeValue = watch('conditionInfo.employmentType');

  // 근무형태 중 하나라도 선택되면 에러메시지 제거(정규직에만 에러 체크했음)
  React.useEffect(() => {
    const validEmploymentType = Object.values(employmentTypeValue).some((value) => value === true);
    if (validEmploymentType) {
      clearErrors('conditionInfo.employmentType.FULL_TIME');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employmentTypeValue]);

  useDidMountEffect(() => {
    setValue('conditionInfo.salaryAmount', 0);
    setFocus('conditionInfo.salaryAmount');
  }, [salaryTypeValue]);

  return (
    <S.RecruitmentRegisterJobConditionForm>
      <HorizontalFormWrapper label="근무형태" required>
        <FormCheckbox<CreateRecruitmentForm>
          label="정규직"
          name="conditionInfo.employmentType.FULL_TIME"
          visibleIcon={false}
          margin="0 30px 0 0"
        />
        <FormCheckbox<CreateRecruitmentForm>
          label="계약직"
          name="conditionInfo.employmentType.CONTRACT"
          visibleIcon={false}
          margin="0 30px 0 0"
        />
        <FormCheckbox<CreateRecruitmentForm>
          label="파출"
          name="conditionInfo.employmentType.DAILY_WORKER"
          visibleIcon={false}
          margin="0 30px 0 0"
        />
        <FormCheckbox<CreateRecruitmentForm>
          label="아르바이트"
          name="conditionInfo.employmentType.PART_TIME"
          visibleIcon={false}
          margin="0 30px 0 0"
        />
        <FormCheckbox<CreateRecruitmentForm>
          label="인턴"
          name="conditionInfo.employmentType.INTERN"
          visibleIcon={false}
          margin="0 30px 0 0"
        />
      </HorizontalFormWrapper>

      {/* <HorizontalFormWrapper label="북리후생" required>
        <FormTagBox name="ㅁㄴㅇ" placeholder="복리후생" maxWidth="378px" />
        <Button
          label="검색"
          variant="select"
          width="120px"
          height="40px"
          margin="0 0 0 15px"
          icon={<Icon name="Plus24x24" color="red" margin="0 5px 0 0" width="16px" height="16px" />}
        />
      </HorizontalFormWrapper> */}

      <HorizontalFormWrapper label="급여" required border="none">
        <FormArrayRadio<CreateRecruitmentForm> options={salaryType} name="conditionInfo.salaryType" />
      </HorizontalFormWrapper>

      <S.PriceBox>
        <FormNumberInput<CreateRecruitmentForm>
          name="conditionInfo.salaryAmount"
          maxWidth="140px"
          unit="원"
          isComma
          margin="0 0 15px 0"
          maxLength={11}
        />
        <MinimumWage salaryType={salaryTypeValue} />
      </S.PriceBox>

      {/* <HorizontalFormWrapper label="항목추가">
        <RecruitmentJobConditionAdditional />
      </HorizontalFormWrapper> */}

      {/* <HorizontalFormWrapper label="항목추가">
        <RecruitmentDetailAdditional />
      </HorizontalFormWrapper> */}

      {/* <S.AdditionalContainer>
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
      </S.AdditionalContainer> */}
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
