import { SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { BusinessForm } from '@/types';
import FormInput from '@/components/common/form/FormInput';
import Button from '@/components/common/style/Button';

interface EmployerSetupCompanyProps {
  onSubmit: SubmitHandler<BusinessForm>;
  children: React.ReactNode;
}

export default function EmployerSetupCompany({ children }: EmployerSetupCompanyProps) {
  return <S.EmployerSetupCompany>{children}</S.EmployerSetupCompany>;
}

const S = {
  EmployerSetupCompany: styled.section`
    border: 1px solid red;
  `,
};
