import React from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { SetupCompanyForm } from '@/types';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';

interface EmployerSetupCompanyProps {
  children: React.ReactNode;
  handleKeyDown: (event: React.KeyboardEvent) => void;
  onSubmit: SubmitHandler<SetupCompanyForm>;
}

export default function EmployerSetupCompany({ onSubmit, handleKeyDown, children }: EmployerSetupCompanyProps) {
  const { handleSubmit } = useFormContext<SetupCompanyForm>();
  const { setAlertWithConfirmAtom } = useAlertWithConfirm();

  React.useEffect(() => {
    setAlertWithConfirmAtom((prev) => ({ ...prev, confirmLabel: '확인', type: 'ALERT', title: 'TITLE_16', subTitle: 'DESC_13' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.EmployerSetupCompany>
      <form className="company-form" onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
        {children}
      </form>
    </S.EmployerSetupCompany>
  );
}

const S = {
  EmployerSetupCompany: styled.section`
    .company-form {
      margin: 0 auto;
      max-width: 400px;
    }
  `,
};
