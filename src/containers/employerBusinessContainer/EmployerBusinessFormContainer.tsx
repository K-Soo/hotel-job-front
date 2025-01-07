import React from 'react';
import { useForm, FormProvider, SubmitHandler, useFormContext } from 'react-hook-form';
import { schema } from '@/utils';
import EmployerTemplateForm from '@/components/common/employer/EmployerTemplateForm';
import FormInputB from '@/components/common/form/FormInputB';
import HorizontalFormWrapper from '@/components/common/form/HorizontalFormWrapper';
import Button from '@/components/common/style/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { EmployerBusinessForm } from '@/types';

export default function EmployerBusinessFormContainer() {
  const [modifyMode, setModifyMode] = React.useState<boolean>(false);

  return (
    <EmployerTemplateForm.Content maxWidth="600px">
      <EmployerTemplateForm.SubTitle title="사업자 정보" />

      <HorizontalFormWrapper>
        <FormInputB<EmployerBusinessForm>
          readOnly={!modifyMode}
          label="사업자등록번호"
          name="businessRegistrationNumber"
          placeholder="사업자등록번호"
          mask="999-99-99999"
        />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper>
        <FormInputB<EmployerBusinessForm> readOnly={!modifyMode} label="상호명" name="companyName" placeholder="상호명" />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper>
        <FormInputB<EmployerBusinessForm> readOnly={!modifyMode} required label="대표자명" name="businessOwner" placeholder="대표자명" />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper>
        <FormInputB<EmployerBusinessForm> readOnly={!modifyMode} label="사업장 주소" name="address" placeholder="주소" />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper>
        <FormInputB<EmployerBusinessForm> readOnly={!modifyMode} label="상세주소" name="addressDetail" placeholder="주소" />
      </HorizontalFormWrapper>
    </EmployerTemplateForm.Content>
  );
}
