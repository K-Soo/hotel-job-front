import React from 'react';
import { useForm, FormProvider, SubmitHandler, useFormContext } from 'react-hook-form';
import { schema } from '@/utils';
import { BusinessForm } from '@/types';
import EmployerTemplateForm from '@/components/common/employer/EmployerTemplateForm';
import FormInputB from '@/components/common/form/FormInputB';
import HorizontalFormWrapper from '@/components/common/form/HorizontalFormWrapper';
import Button from '@/components/common/style/Button';
import { yupResolver } from '@hookform/resolvers/yup';

export default function EmployerBusinessFormContainer() {
  const [modifyMode, setModifyMode] = React.useState<boolean>(false);

  const methods = useForm<BusinessForm>({
    resolver: yupResolver(schema.businessForm),
    // disabled: disabled,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {},
  });

  return (
    <FormProvider {...methods}>
      <EmployerTemplateForm.Content maxWidth="600px">
        <EmployerTemplateForm.SubTitle title="사업자 정보" />

        <HorizontalFormWrapper>
          <FormInputB<BusinessForm>
            disabled={modifyMode}
            readOnly={!modifyMode}
            label="사업자등록번호"
            name="businessRegistrationNumber"
            placeholder="사업자등록번호"
          />
        </HorizontalFormWrapper>

        <HorizontalFormWrapper>
          <FormInputB<BusinessForm> disabled={modifyMode} readOnly={!modifyMode} label="상호명" name="businessName" placeholder="상호명" />
        </HorizontalFormWrapper>

        <HorizontalFormWrapper>
          <FormInputB<BusinessForm>
            // disabled={modifyMode}
            readOnly={!modifyMode}
            required
            label="대표자명"
            name="tradeName"
            placeholder="대표자명"
          />
        </HorizontalFormWrapper>

        <HorizontalFormWrapper>
          <FormInputB<BusinessForm>
            disabled={modifyMode}
            readOnly={!modifyMode}
            label="사업장 주소"
            name="businessName"
            placeholder="주소"
          />
        </HorizontalFormWrapper>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          {modifyMode && (
            <>
              <Button
                label="취소"
                variant="secondary"
                width="100px"
                height="35px"
                onClick={() => setModifyMode(false)}
                margin="0 15px 0 0"
              />
              <Button label="저장" variant="primary" width="100px" height="35px" onClick={() => setModifyMode(true)} />
            </>
          )}
          {!modifyMode && <Button label="수정" variant="secondary100" width="100px" height="35px" onClick={() => setModifyMode(true)} />}
        </div>
      </EmployerTemplateForm.Content>
    </FormProvider>
  );
}
