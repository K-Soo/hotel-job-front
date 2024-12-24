import styled from 'styled-components';
import { ResumeRegisterForm } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import FormInput from '@/components/common/form/FormInput';
import FormDate from '@/components/common/form/FormDate';

interface ResumeLicenseFormProps {}

import { useFormContext } from 'react-hook-form';

export default function ResumeLicenseForm({}: ResumeLicenseFormProps) {
  const { watch } = useFormContext<ResumeRegisterForm>();

  const licensesValue = watch('licenses');

  return (
    <S.ResumeLicenseForm>
      {licensesValue.map((_, index) => (
        <div key={uuidv4()} className="license-item">
          <FormInput<ResumeRegisterForm> name={`licenses.${index}.licenseName`} placeholder="자격증 이름" label="자격증명" required />
          <FormDate<ResumeRegisterForm> name={`licenses.${index}.dateOfCompletion`} label="취득일" required />
        </div>
      ))}
    </S.ResumeLicenseForm>
  );
}

const S = {
  ResumeLicenseForm: styled.div``,
};
