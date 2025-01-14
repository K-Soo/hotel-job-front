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
import FormArrayChipsCheckbox from '@/components/common/form/FormArrayChipsCheckbox';
import { allJobs } from '@/constants/job';
import { preferences } from '@/constants/preferences';
import useDidMountEffect from '@/hooks/useDidMountEffect';

interface RegisterInfoFormProps {
  setIsOpenJobModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenPreferencesModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RegisterInfoForm({ setIsOpenJobModal, setIsOpenPreferencesModal }: RegisterInfoFormProps) {
  const [additionalTabs, setAdditionalTabs] = React.useState<Record<string, boolean>>({
    department: false,
    position: false,
    preferences: false,
  });

  const {
    watch,
    clearErrors,
    formState: { isSubmitting },
  } = useFormContext<CreateRecruitmentForm>();

  const isCheckedForeigner = watch('recruitmentInfo.nationality.foreigner');
  const departmentValue = watch('recruitmentInfo.department');
  const positionValue = watch('recruitmentInfo.position');

  const handleClickToggleButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;
    setAdditionalTabs((prev) => ({ ...prev, [name]: prev[name] ? false : true }));
  };

  // TODO 초기화 버튼으로..
  React.useEffect(() => {
    // if (!additionalTabs.department) {
    //   setValue('recruitmentInfo.department', '');
    // }
    // if (!additionalTabs.position) {
    //   setValue('recruitmentInfo.position', null);
    // }
  }, [departmentValue, positionValue]);

  React.useEffect(() => {
    if (isCheckedForeigner) {
      clearErrors('recruitmentInfo.nationality.korean');
    }
  }, [isCheckedForeigner, clearErrors]);

  return (
    <S.RegisterInfoForm>
      <HorizontalFormWrapper>
        <FormArrayChipsCheckbox<CreateRecruitmentForm>
          name="recruitmentInfo.jobs"
          label="직무"
          required
          onClickInputForm={() => setIsOpenJobModal(true)}
          optionsKeyData={allJobs}
          placeholder="직무를 선택해주세요"
        />
        <Button
          label="선택"
          variant="primary"
          height="40px"
          width="100px"
          margin="0 0 0 15px"
          disabled={isSubmitting}
          onClick={() => setIsOpenJobModal(true)}
        />
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
        <RecruitmentDetailAdditional handleClickToggleButton={handleClickToggleButton} additionalTabs={additionalTabs} />
      </HorizontalFormWrapper>

      <S.AdditionalContainer style={{ display: additionalTabs.preferences ? 'block' : 'none' }}>
        <HorizontalFormWrapper>
          <FormArrayChipsCheckbox<CreateRecruitmentForm>
            name="recruitmentInfo.preferences"
            label="우대사항"
            onClickInputForm={() => setIsOpenPreferencesModal(true)}
            optionsKeyData={preferences}
            placeholder="우대사항을 선택해주세요"
          />
          <Button
            label="선택"
            variant="primary"
            height="40px"
            width="120px"
            margin="0 0 0 15px"
            onClick={() => setIsOpenPreferencesModal(true)}
          />
        </HorizontalFormWrapper>
      </S.AdditionalContainer>

      <S.AdditionalContainer style={{ display: additionalTabs.department ? 'block' : 'none' }}>
        <HorizontalFormWrapper label="근무부서">
          <FormInputB<CreateRecruitmentForm> name="recruitmentInfo.department" placeholder="근무하게 될 부서 또는 근무지" maxLength={30} />
        </HorizontalFormWrapper>
      </S.AdditionalContainer>

      <S.AdditionalContainer style={{ display: additionalTabs.position ? 'block' : 'none' }}>
        <HorizontalFormWrapper label="직급">
          <FormSelect name="recruitmentInfo.position" options={optionalPositionOptions} />
        </HorizontalFormWrapper>
      </S.AdditionalContainer>
    </S.RegisterInfoForm>
  );
}

const S = {
  RegisterInfoForm: styled.div``,
  AdditionalContainer: styled.div`
    background-color: ${(props) => props.theme.colors.gray};
    opacity: 0.95;
  `,
};
