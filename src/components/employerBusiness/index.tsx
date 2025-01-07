import styled from 'styled-components';
import EmployerTemplateForm from '@/components/common/employer/EmployerTemplateForm';
import FormInput from '@/components/common/form/FormInput';
import FormInputB from '@/components/common/form/FormInputB';
import HorizontalFormWrapper from '@/components/common/form/HorizontalFormWrapper';
import Button from '@/components/common/style/Button';
import { SubmitHandler, useFormContext } from 'react-hook-form';

interface EmployerBusinessProps {
  children: React.ReactNode;
}

const breadcrumbData = [{ label: '업체정보', href: '/employer/business' }];

export default function EmployerBusiness({ children }: EmployerBusinessProps) {
  return (
    <S.EmployerBusiness>
      <EmployerTemplateForm height="calc(100%)">
        <EmployerTemplateForm.Title title="업체 정보 관리" />
        {children}
      </EmployerTemplateForm>
    </S.EmployerBusiness>
  );
}

const S = {
  EmployerBusiness: styled.section``,
};
