import styled from 'styled-components';
import HorizontalFormWrapper from '@/components/common/form/HorizontalFormWrapper';
import FormInputB from '@/components/common/form/FormInputB';
import Button from '@/components/common/style/Button';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { EmployerAccountResetForm } from '@/types';

interface ChangePasswordFormProps {
  onSubmit: SubmitHandler<EmployerAccountResetForm>;
}

export default function ChangePasswordForm({ onSubmit }: ChangePasswordFormProps) {
  const { handleSubmit } = useFormContext<EmployerAccountResetForm>();

  return (
    <S.ChangePasswordForm>
      <S.Description>
        현재 비밀번호와
        <br />새 비밀번호를 입력해주세요.
      </S.Description>

      <form className="change-form" onSubmit={handleSubmit(onSubmit)}>
        <HorizontalFormWrapper>
          <FormInputB<EmployerAccountResetForm>
            required
            label="현재 비밀번호"
            name="currentPassword"
            placeholder="현재 비밀번호"
            type="password"
            maxLength={30}
          />
        </HorizontalFormWrapper>

        <HorizontalFormWrapper>
          <FormInputB<EmployerAccountResetForm>
            required
            label="새 비밀번호"
            name="newPassword"
            placeholder="새 비밀번호"
            maxLength={30}
            type="password"
          />
        </HorizontalFormWrapper>

        <HorizontalFormWrapper>
          <FormInputB<EmployerAccountResetForm>
            required
            label="비밀번호 확인"
            name="newPasswordConfirm"
            placeholder="비밀번호 확인"
            maxLength={30}
            type="password"
          />
        </HorizontalFormWrapper>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button label="변경하기" type="submit" variant="primary" margin="50px 0 0 0" maxWidth="200px" />
        </div>
      </form>
    </S.ChangePasswordForm>
  );
}

const S = {
  ChangePasswordForm: styled.div`
    width: 100%;
    .change-form {
    }
  `,
  Description: styled.p`
    font-size: 20px;
    font-weight: 500;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.black500};
    margin-bottom: 30px;
  `,
};
