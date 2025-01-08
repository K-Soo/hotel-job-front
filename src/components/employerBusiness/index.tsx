import styled from 'styled-components';
import EmployerTemplateForm from '@/components/common/employer/EmployerTemplateForm';

interface EmployerBusinessProps {
  children: React.ReactNode;
}

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
