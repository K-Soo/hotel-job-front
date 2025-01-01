import styled from 'styled-components';
import EmployerTemplateForm from '@/components/common/employer/EmployerTemplateForm';
import FormInputB from '@/components/common/form/FormInputB';
import HorizontalFormWrapper from '@/components/common/form/HorizontalFormWrapper';
import Button from '@/components/common/style/Button';

interface EmployerAccountProps {}

export default function EmployerAccount({}: EmployerAccountProps) {
  return (
    <S.EmployerAccount>
      <EmployerTemplateForm height="100%">
        <EmployerTemplateForm.Title title="계정 정보 관리" />
        <EmployerTemplateForm.Content maxWidth="600px">
          <EmployerTemplateForm.SubTitle title="기본 정보" />

          <HorizontalFormWrapper>
            <FormInputB<any> label="아이디" name="businessRegistrationNumber" placeholder="아이디" readOnly={true} />
          </HorizontalFormWrapper>

          <HorizontalFormWrapper>
            <FormInputB<any> label="닉네임" name="businessRegistrationNumber" placeholder="닉네임" minWidth="auto" readOnly={true} />
            <Button label="변경" variant="tertiary" width="80px" height="40px" margin="0 0 0 15px" fontSize="14px" />
          </HorizontalFormWrapper>

          <HorizontalFormWrapper>
            <FormInputB<any> label="가입일" name="businessRegistrationNumber" placeholder="가입일" minWidth="auto" readOnly={true} />
          </HorizontalFormWrapper>
        </EmployerTemplateForm.Content>

        <EmployerTemplateForm.Content maxWidth="600px">
          <EmployerTemplateForm.SubTitle title="인증 정보" />

          <HorizontalFormWrapper>
            <FormInputB<any> label="휴대폰" name="businessRegistrationNumber" placeholder="휴대폰 인증" minWidth="auto" readOnly={true} />
            <Button label="변경" variant="tertiary" width="80px" height="40px" margin="0 0 0 15px" fontSize="14px" />
          </HorizontalFormWrapper>

          <HorizontalFormWrapper>
            <FormInputB<any> label="이메일" name="businessRegistrationNumber" placeholder="이메일" minWidth="auto" readOnly={true} />
            <Button label="변경" variant="tertiary" width="80px" height="40px" margin="0 0 0 15px" fontSize="14px" />
          </HorizontalFormWrapper>
        </EmployerTemplateForm.Content>
      </EmployerTemplateForm>
    </S.EmployerAccount>
  );
}

const S = {
  EmployerAccount: styled.section``,
};
