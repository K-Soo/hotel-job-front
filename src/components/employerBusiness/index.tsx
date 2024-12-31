import styled from 'styled-components';
import EmployerTemplateForm from '@/components/common/employer/EmployerTemplateForm';
import FormInput from '@/components/common/form/FormInput';
import FormInputB from '@/components/common/form/FormInputB';
import HorizontalFormWrapper from '@/components/common/form/HorizontalFormWrapper';
import Button from '@/components/common/style/Button';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { BusinessForm } from '@/types';

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

        {/* <EmployerTemplateForm.Content maxWidth="600px">
          <EmployerTemplateForm.SubTitle title="담당자 정보" />
          <FormInputB<any> readOnly={false} required label="담당자명" name="c" placeholder="대표자명" />
          <FormInputB<any> readOnly={false} required label="담당자 이메일" name="c" placeholder="담당자 이메일" />
          <FormInputB<any> readOnly={false} required label="담당자 연락처" name="c" placeholder="담당자 연락처" />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button label="수정" variant="secondary100" width="100px" height="35px" />
          </div>
        </EmployerTemplateForm.Content> */}
      </EmployerTemplateForm>
    </S.EmployerBusiness>
  );
}

const S = {
  EmployerBusiness: styled.section`
    /* border: 1px solid red; */
  `,
};
