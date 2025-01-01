import styled from 'styled-components';
import EmployerTemplateForm from '@/components/common/employer/EmployerTemplateForm';
import FormInputB from '@/components/common/form/FormInputB';
import HorizontalFormWrapper from '@/components/common/form/HorizontalFormWrapper';
import Button from '@/components/common/style/Button';
import ToggleButton from '@/components/common/ToggleButton';

interface EmployerAccountPolicyProps {}

export default function EmployerAccountPolicy({}: EmployerAccountPolicyProps) {
  return (
    <S.EmployerAccountPolicy>
      <EmployerTemplateForm height="100%">
        <EmployerTemplateForm.Title title="이용동의 관리" />
        <EmployerTemplateForm.Content maxWidth="600px">
          <EmployerTemplateForm.SubTitle title="필수 기본 동의" />

          <HorizontalFormWrapper>
            <FormInputB<any> label="20세 이상" name="businessRegistrationNumber" placeholder="아이디" readOnly={true} minWidth="auto" />
            <ToggleButton />
          </HorizontalFormWrapper>

          <HorizontalFormWrapper>
            <FormInputB<any>
              label="서비스이용 동의"
              name="businessRegistrationNumber"
              placeholder="아이디"
              readOnly={true}
              minWidth="auto"
            />
            <ToggleButton />
          </HorizontalFormWrapper>

          <HorizontalFormWrapper>
            <FormInputB<any>
              label="개인정보 수집동의"
              name="businessRegistrationNumber"
              placeholder="닉네임"
              readOnly={true}
              minWidth="auto"
            />
            <ToggleButton />
          </HorizontalFormWrapper>
        </EmployerTemplateForm.Content>

        <EmployerTemplateForm.Content maxWidth="600px">
          <EmployerTemplateForm.SubTitle title="마케팅 수신 설정" />

          <HorizontalFormWrapper>
            <FormInputB<any> label="이메일 수신" name="businessRegistrationNumber" placeholder="아이디" readOnly={true} minWidth="auto" />
            <ToggleButton />
          </HorizontalFormWrapper>

          <HorizontalFormWrapper>
            <FormInputB<any> label="휴대폰 수신" name="businessRegistrationNumber" placeholder="아이디" readOnly={true} minWidth="auto" />
            <ToggleButton />
          </HorizontalFormWrapper>
        </EmployerTemplateForm.Content>
      </EmployerTemplateForm>
    </S.EmployerAccountPolicy>
  );
}

const S = {
  EmployerAccountPolicy: styled.section``,
};
