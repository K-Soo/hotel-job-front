import styled from 'styled-components';
import HorizontalFormWrapper from '@/components/common/form/HorizontalFormWrapper';
import FormInputB from '@/components/common/form/FormInputB';
import FormSelect from '@/components/common/form/FormSelect';
import FormInput from '@/components/common/form/FormInput';
import FormNumberInput from '@/components/common/form/FormNumberInput';
import FormCheckbox from '@/components/common/form/FormCheckbox';
import FormRadio from '@/components/common/form/FormRadio';
import { useFormContext } from 'react-hook-form';
import RecruitmentDetailAdditional from '@/components/employerRecruitmentRegister/RecruitmentDetailAdditional';
import { educationConditionLevelOptions, optionalPositionOptions } from '@/constants/options';
import Button from '@/components/common/style/Button';
import { CreateRecruitmentForm } from '@/types';
import { experienceCondition } from '@/constants/recruitment';
import React from 'react';
import FormArrayCheckbox from '@/components/common/form/FormArrayCheckbox';

interface RecruitmentRegisterDetailFormProps {
  setIsOpenJobModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RecruitmentRegisterDetailForm({ setIsOpenJobModal }: RecruitmentRegisterDetailFormProps) {
  const { watch, clearErrors } = useFormContext<CreateRecruitmentForm>();

  // const departmentValue = watch('department');
  // const positionValue = watch('position');

  const isCheckedForeigner = watch('recruitmentInfo.nationality.foreigner');

  React.useEffect(() => {
    if (isCheckedForeigner) {
      clearErrors('recruitmentInfo.nationality.korean');
    }
  }, [isCheckedForeigner, clearErrors]);

  return (
    <S.RecruitmentRegisterDetailForm>
      <HorizontalFormWrapper>
        <FormArrayCheckbox<CreateRecruitmentForm> label="직무" name="recruitmentInfo.jobs" required />
        <Button label="선택" variant="primary" height="40px" width="100px" margin="0 0 0 15px" onClick={() => setIsOpenJobModal(true)} />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper label="경력" required>
        <FormRadio<CreateRecruitmentForm>
          label="경력"
          name="recruitmentInfo.experienceCondition"
          margin="0 30px 0 0"
          value={experienceCondition.EXPERIENCED}
        />
        <FormRadio label="신입" name="recruitmentInfo.experienceCondition" margin="0 30px 0 0" value={experienceCondition.NEWBIE} />
        <FormRadio label="경력무관" name="recruitmentInfo.experienceCondition" value={experienceCondition.NOT_REQUIRED} />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper label="국적" required>
        <FormCheckbox<CreateRecruitmentForm>
          label="내국인"
          name="recruitmentInfo.nationality.korean"
          visibleIcon={false}
          margin="0 30px 0 0"
        />
        <FormCheckbox<CreateRecruitmentForm>
          label="외국인"
          name="recruitmentInfo.nationality.foreigner"
          visibleIcon={false}
          margin="0 30px 0 0"
        />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper label="비자 조건" required style={{ display: isCheckedForeigner ? 'block' : 'none' }}>
        <FormInputB<CreateRecruitmentForm>
          name="recruitmentInfo.nationality.marriageVisa"
          placeholder="예시) H-2, F-2, 결혼비자, 영주권"
          maxLength={30}
        />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper label="모집인원" required>
        <FormNumberInput<CreateRecruitmentForm>
          name="recruitmentInfo.recruitmentCapacity"
          placeholder="모집인원"
          maxWidth="100px"
          unit="명"
          maxLength={2}
        />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper label="학력조건">
        <FormSelect<CreateRecruitmentForm>
          name="recruitmentInfo.educationCondition"
          options={educationConditionLevelOptions}
          maxWidth="165px"
        />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper label="항목추가">
        <RecruitmentDetailAdditional />
      </HorizontalFormWrapper>

      {/* 
      <S.AdditionalContainer>
        <FormInput<any> label="근무부서" name="department.value" placeholder="근무하게 될 부서 또는 근무지" isFocusing />
      </S.AdditionalContainer>

      <S.AdditionalContainer>
        <FormSelect name="position" options={optionalPositionOptions} label="직급" />
      </S.AdditionalContainer> */}
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
