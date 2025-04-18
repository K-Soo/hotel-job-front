import React from 'react';
import styled from 'styled-components';
import HorizontalFormWrapper from '@/components/common/form/HorizontalFormWrapper';
import FormCheckbox from '@/components/common/form/FormCheckbox';
import FormArrayRadio from '@/components/common/form/FormArrayRadio';
import FormRadio from '@/components/common/form/FormRadio';
import Button from '@/components/common/style/Button';
import RecruitmentJobConditionAdditional from '@/components/employerRecruitmentRegister/RecruitmentJobConditionAdditional';
import { useFormContext } from 'react-hook-form';
import { CreateRecruitmentForm, SalaryTypeKeys } from '@/types';
import FormNumberInput from '@/components/common/form/FormNumberInput';
import MinimumWage from '@/components/common/employer/MinimumWage';
import Line from '@/components/common/Line';
import { SALARY_TYPE } from '@/constants';
import useDidMountEffect from '@/hooks/useDidMountEffect';
import FormInputB from '@/components/common/form/FormInputB';
import { WORKING_DAY_LIST } from '@/constants/recruitment';
import { BENEFITS } from '@/constants/benefits';
import FormArrayChipsCheckbox from '@/components/common/form/FormArrayChipsCheckbox';

interface RecruitmentRegisterJobConditionFormProps {
  setIsOpenBenefitsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RecruitmentRegisterJobConditionForm({ setIsOpenBenefitsModal }: RecruitmentRegisterJobConditionFormProps) {
  const [additionalTabs, setAdditionalTabs] = React.useState<Record<string, boolean>>({
    workingDay: false,
    workingTime: false,
    benefits: false,
  });

  const {
    watch,
    setValue,
    clearErrors,
    formState: { isValidating, isSubmitting },
  } = useFormContext<CreateRecruitmentForm>();

  const salaryTypeValue = watch('conditionInfo.salaryType') as SalaryTypeKeys;
  const employmentTypeValue = watch('conditionInfo.employmentType');

  const handleClickToggleButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;

    setAdditionalTabs((prev) => {
      return {
        ...prev,
        [name]: prev[name] ? false : true,
      };
    });
  };

  React.useEffect(() => {
    if (!additionalTabs.workingDay) {
      setValue('conditionInfo.workingDay', null);
    }
    if (!additionalTabs.workingTime) {
      setValue('conditionInfo.workingTime.start', '');
      setValue('conditionInfo.workingTime.end', '');
    }
    if (!additionalTabs.benefits) {
      setValue('conditionInfo.benefits', []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [additionalTabs.benefits, additionalTabs.workingDay, additionalTabs.workingTime]);

  // 근무형태 중 하나라도 선택되면 에러메시지 제거(정규직 필드만 에러 체크했음)
  React.useEffect(() => {
    const validEmploymentType = Object.values(employmentTypeValue).some((value) => value === true);
    if (validEmploymentType) {
      clearErrors('conditionInfo.employmentType.FULL_TIME');
    }
  }, [clearErrors, employmentTypeValue, isValidating]);

  useDidMountEffect(() => {
    setValue('conditionInfo.salaryAmount', 0);
  }, [salaryTypeValue]);

  return (
    <S.RecruitmentRegisterJobConditionForm>
      <HorizontalFormWrapper label="고용형태" required>
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

      <HorizontalFormWrapper label="급여" required border="none">
        <FormArrayRadio<CreateRecruitmentForm> options={SALARY_TYPE} name="conditionInfo.salaryType" />
      </HorizontalFormWrapper>

      <S.PriceBox>
        <FormNumberInput<CreateRecruitmentForm>
          name="conditionInfo.salaryAmount"
          maxWidth="140px"
          unit="원"
          isComma
          margin="0 0 30px 0"
          maxLength={11}
        />
        <MinimumWage salaryType={salaryTypeValue} />
      </S.PriceBox>

      <Line margin="15px 0 0 0" />

      <HorizontalFormWrapper label="항목추가" border="none">
        <RecruitmentJobConditionAdditional handleClickToggleButton={handleClickToggleButton} additionalTabs={additionalTabs} />
      </HorizontalFormWrapper>

      <S.AdditionalContainer style={{ display: additionalTabs.workingDay ? 'block' : 'none' }}>
        <S.AdditionalTitle>근무시간</S.AdditionalTitle>
        <div className="day-form">
          <div>
            <FormRadio<CreateRecruitmentForm>
              margin="0 0 10px 0"
              name="conditionInfo.workingDay"
              label={WORKING_DAY_LIST.WEEKDAYS_5}
              value="WEEKDAYS_5"
            />
            <FormRadio<CreateRecruitmentForm>
              margin="0 0 10px 0"
              name="conditionInfo.workingDay"
              label={WORKING_DAY_LIST.WEEKDAYS_6}
              value="WEEKDAYS_6"
            />

            <FormRadio margin="0 0 10px 0" name="conditionInfo.workingDay" label={WORKING_DAY_LIST.WEEKEND_DAY} value="WEEKEND_DAY" />
            <FormRadio margin="0 0 10px 0" name="conditionInfo.workingDay" label={WORKING_DAY_LIST.WEEKEND_NIGHT} value="WEEKEND_NIGHT" />
            <FormRadio margin="0 0 10px 0" name="conditionInfo.workingDay" label={WORKING_DAY_LIST.NIGHT} value="NIGHT" />
            <FormRadio margin="0" name="conditionInfo.workingDay" label={WORKING_DAY_LIST.TO_BE_DECIDED} value="TO_BE_DECIDED" />
          </div>

          <div>
            <FormRadio
              margin="0 0 10px 0"
              name="conditionInfo.workingDay"
              label={WORKING_DAY_LIST.TWO_SHIFT_DAY_DAY_NIGHT_NIGHT}
              value="TWO_SHIFT_DAY_DAY_NIGHT_NIGHT"
            />
            <FormRadio
              margin="0 0 10px 0"
              name="conditionInfo.workingDay"
              label={WORKING_DAY_LIST.TWO_SHIFT_DAY_NIGHT_OFF_OFF}
              value="TWO_SHIFT_DAY_NIGHT_OFF_OFF"
            />
            <FormRadio
              margin="0 0 10px 0"
              name="conditionInfo.workingDay"
              label={WORKING_DAY_LIST.TWO_SHIFT_DAY_NIGHT}
              value="TWO_SHIFT_DAY_NIGHT"
            />
            <FormRadio
              margin="0 0 10px 0"
              name="conditionInfo.workingDay"
              label={WORKING_DAY_LIST.THREE_SHIFT_DAY_DAY_NIGHT_NIGHT_OFF_OFF}
              value="THREE_SHIFT_DAY_DAY_NIGHT_NIGHT_OFF_OFF"
            />
            <FormRadio
              margin="0 0 10px 0"
              name="conditionInfo.workingDay"
              label={WORKING_DAY_LIST.THREE_SHIFT_DAY_NIGHT_OFF}
              value="THREE_SHIFT_DAY_NIGHT_OFF"
            />
            <FormRadio
              margin="0"
              name="conditionInfo.workingDay"
              label={WORKING_DAY_LIST.THREE_SHIFT_MORNING_AFTERNOON_NIGHT}
              value="THREE_SHIFT_MORNING_AFTERNOON_NIGHT"
            />
          </div>

          <div>
            <FormRadio
              margin="0 0 10px 0"
              name="conditionInfo.workingDay"
              label={WORKING_DAY_LIST.ALTERNATE_DAY_SHIFT}
              value="ALTERNATE_DAY_SHIFT"
            />
            <FormRadio
              margin="0 0 10px 0"
              name="conditionInfo.workingDay"
              label={WORKING_DAY_LIST.ALTERNATE_NIGHT_SHIFT}
              value="ALTERNATE_NIGHT_SHIFT"
            />
            <FormRadio margin="0" name="conditionInfo.workingDay" label={WORKING_DAY_LIST.ALTERNATE_2DAY_OFF} value="ALTERNATE_2DAY_OFF" />
          </div>
        </div>
      </S.AdditionalContainer>

      <S.AdditionalContainer style={{ display: additionalTabs.workingTime ? 'block' : 'none' }}>
        <div className="time-form">
          <S.AdditionalTitle>출퇴근 시간</S.AdditionalTitle>
          <div className="time-form__wrapper">
            <FormInputB<CreateRecruitmentForm>
              name="conditionInfo.workingTime.start"
              placeholder="출근시간"
              maxLength={30}
              mask="99:99"
              maxWidth="100px"
            />
            <span className="icon">~</span>
            <FormInputB<CreateRecruitmentForm>
              name="conditionInfo.workingTime.end"
              placeholder="퇴근시간"
              maxLength={30}
              mask="99:99"
              maxWidth="100px"
            />
          </div>
        </div>
      </S.AdditionalContainer>

      <S.AdditionalContainer style={{ display: additionalTabs.benefits ? 'block' : 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', marginBottom: '10px' }}>
          <S.AdditionalTitle>복리후생</S.AdditionalTitle>
          <Button
            label="선택"
            variant="primary"
            width="80px"
            height="30px"
            onClick={() => setIsOpenBenefitsModal(true)}
            disabled={isSubmitting}
          />
        </div>
        <FormArrayChipsCheckbox<CreateRecruitmentForm>
          optionsKeyData={BENEFITS}
          name="conditionInfo.benefits"
          onClickInputForm={() => setIsOpenBenefitsModal(true)}
        />
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
    padding: 20px 15px;
    background-color: ${(props) => props.theme.colors.gray};
    opacity: 0.95;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
    .day-form {
      display: flex;
      & > div {
        flex: 1;
      }
    }
    .time-form {
      &__wrapper {
        display: flex;
        align-items: center;
      }
      .icon {
        padding: 0 10px;
      }
    }
  `,
  AdditionalTitle: styled.h6`
    color: ${(props) => props.theme.colors.gray700};
    font-size: 14px;
    height: 30px;
    display: flex;
    align-items: center;
  `,
};
