import React from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { ResumeDetailForm } from '@/types';
import FormInput from '@/components/common/form/FormInput';
import FormSelect from '@/components/common/form/FormSelect';
import FormArea from '@/components/common/form/FormArea';
import FormToggle from '@/components/common/form/FormToggle';
import FormDate from '@/components/common/form/FormDate';
import Button from '@/components/common/style/Button';
import { optionalJobOptions, positionOptions } from '@/constants/options';

interface ResumeExperienceItemProps {
  index: number;
}

export default function ResumeExperienceItem({ index }: ResumeExperienceItemProps) {
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
      <FormInput<ResumeDetailForm>
        name={`experience.${index}.companyName`}
        placeholder="회사명"
        label="회사명"
        required
        maxLength={30}
        margin="0 0 15px 0"
      />

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <FormDate<ResumeDetailForm>
          maxWidth="100px"
          name={`experience.${index}.startDate`}
          label="입사년월"
          margin="0 15px 0 0"
          required
          placeholder="입사년월"
        />
        <FormDate<ResumeDetailForm>
          maxWidth="100px"
          name={`experience.${index}.endDate`}
          label="퇴사년월"
          margin="0 10px 0 0"
          placeholder="퇴사년월"
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

      <FormArea name={`experience.${index}.responsibility`} label="담당업무" maxLength={200} />

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
    margin-bottom: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray100};
    &:last-child {
      border-bottom: none;
    }
  `,
};
