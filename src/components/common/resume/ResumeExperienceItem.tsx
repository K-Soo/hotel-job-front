import React from 'react';
import styled from 'styled-components';
import { UseFieldArrayRemove, useFormContext } from 'react-hook-form';
import { ResumeDetailForm } from '@/types';
import FormInput from '@/components/common/form/FormInput';
import FormSelect from '@/components/common/form/FormSelect';
import FormArea from '@/components/common/form/FormArea';
import FormToggle from '@/components/common/form/FormToggle';
import FormDate from '@/components/common/form/FormDate';
import Button from '@/components/common/style/Button';
import { optionalJobOptions, positionOptions } from '@/constants/options';
import RemoveButton from '@/components/common/style/RemoveButton';

interface ResumeExperienceItemProps {
  index: number;
  remove: UseFieldArrayRemove;
}

export default function ResumeExperienceItem({ index, remove }: ResumeExperienceItemProps) {
  const [isOnResignationReason, setIsOnResignationReason] = React.useState(false);
  const { setValue, setFocus, watch } = useFormContext();

  const reasonForLeavingValue = watch(`experience.${index}.reasonForLeaving`);
  const isEmployedValue = watch(`experience.${index}.isEmployed`);
  const endDateValue = watch(`experience.${index}.endDate`);

  const handleToggleResignationReason = () => {
    if (isOnResignationReason) {
      setIsOnResignationReason(false);
      return setValue(`experience.${index}.reasonForLeaving`, '');
    }
    setIsOnResignationReason(true);
    setFocus(`experience.${index}.reasonForLeaving`);
  };

  React.useEffect(() => {
    if (reasonForLeavingValue) {
      setIsOnResignationReason(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (isEmployedValue) {
      setValue(`experience.${index}.endDate`, null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isEmployedValue]);

  React.useEffect(() => {
    if (endDateValue) {
      setValue(`experience.${index}.isEmployed`, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDateValue, index]);

  return (
    <S.ResumeExperienceItem>
      <div className="mb-3 flex justify-end align-middle">
        <RemoveButton onClick={() => remove(index)} />
      </div>

      <FormInput<ResumeDetailForm> name={`experience.${index}.companyName`} placeholder="회사명" label="회사명" required maxLength={30} />

      <FormDate<ResumeDetailForm> maxWidth="210px" name={`experience.${index}.startDate`} label="입사일" required placeholder="입사일" />

      <div className="flex items-center align-middle">
        <FormDate<ResumeDetailForm>
          maxWidth="210px"
          name={`experience.${index}.endDate`}
          label="퇴사일"
          margin="0 15px 0 0"
          placeholder="퇴사일"
        />
        <FormToggle<ResumeDetailForm> label="재직중" name={`experience.${index}.isEmployed`} />
      </div>

      <div style={{ display: 'flex' }}>
        <FormSelect
          name={`experience.${index}.job`}
          label="직무"
          options={optionalJobOptions}
          required
          margin="0 15px 0 0"
          maxWidth="200px"
        />
        <FormSelect name={`experience.${index}.position`} label="직급/직책" options={positionOptions} maxWidth="180px" />
      </div>

      <FormArea name={`experience.${index}.responsibility`} label="담당업무" maxLength={200} placeholder="담당했던 업무를 알려주세요" />

      <div className="experience-item__resignation">
        {isOnResignationReason && (
          <FormInput<ResumeDetailForm>
            name={`experience.${index}.reasonForLeaving`}
            placeholder="퇴사사유"
            required
            maxLength={30}
            errorPosition="absolute"
            maxWidth="280px"
            margin="0 0 15px 0"
          />
        )}

        <Button label="퇴사사유" variant="tertiary" width="90px" height="35px" fontSize="14px" onClick={handleToggleResignationReason} />
      </div>
    </S.ResumeExperienceItem>
  );
}

const S = {
  ResumeExperienceItem: styled.div`
    padding: 15px;
    margin-bottom: 15px;
    /* border-bottom: 1px solid ${(props) => props.theme.colors.gray100}; */
    background-color: ${(props) => props.theme.colors.blue30};
    border: 1px solid ${(props) => props.theme.colors.blue50};
    border-radius: 10px;
    &:last-child {
      border-bottom: none;
    }
  `,
};
