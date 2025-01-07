import React from 'react';
import { EmployerBusinessForm } from '@/types';
import EmployerTemplateForm from '@/components/common/employer/EmployerTemplateForm';
import FormInputB from '@/components/common/form/FormInputB';
import HorizontalFormWrapper from '@/components/common/form/HorizontalFormWrapper';
import Button from '@/components/common/style/Button';

export default function EmployerBusinessManagerFormContainer() {
  const [modifyMode, setModifyMode] = React.useState<boolean>(false);

  return (
    <EmployerTemplateForm.Content maxWidth="600px">
      <EmployerTemplateForm.SubTitle title="담당자 정보" />

      <HorizontalFormWrapper>
        <FormInputB<EmployerBusinessForm> readOnly={!modifyMode} label="담당자" name="managerName" placeholder="담당자" />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper>
        <FormInputB<EmployerBusinessForm> readOnly={!modifyMode} label="담당자 연락처" name="managerNumber" placeholder="담당자 연락처" />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper>
        <FormInputB<EmployerBusinessForm>
          readOnly={!modifyMode}
          required
          label="담당자 이메일"
          name="managerEmail"
          placeholder="담당자 이메일"
        />
      </HorizontalFormWrapper>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        {modifyMode && (
          <>
            <Button label="취소" variant="secondary" width="100px" height="35px" onClick={() => setModifyMode(false)} margin="0 15px 0 0" />
            <Button label="저장" variant="primary" width="100px" height="35px" onClick={() => setModifyMode(true)} />
          </>
        )}
        {!modifyMode && <Button label="수정" variant="secondary100" width="100px" height="35px" onClick={() => setModifyMode(true)} />}
      </div>
    </EmployerTemplateForm.Content>
  );
}
