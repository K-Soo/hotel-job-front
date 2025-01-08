import { SubmitHandler, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { SetupCompanyForm } from '@/types';
import FormInput from '@/components/common/form/FormInput';
import Button from '@/components/common/style/Button';

interface EmployerSetupCompanyProps {
  children: React.ReactNode;
  handleKeyDown: (event: React.KeyboardEvent) => void;
  onSubmit: SubmitHandler<SetupCompanyForm>;
}

export default function EmployerSetupCompany({ onSubmit, handleKeyDown, children }: EmployerSetupCompanyProps) {
  const { handleSubmit } = useFormContext<SetupCompanyForm>();

  return (
    <S.EmployerSetupCompany>
      <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
        {children}
      </form>
    </S.EmployerSetupCompany>
  );
}

const S = {
  EmployerSetupCompany: styled.section``,
};
