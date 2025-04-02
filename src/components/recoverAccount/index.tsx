import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import RadioButton from '@/components/common/style/RadioButton';
import FormInput from '@/components/common/form/FormInput';
import { EmployerAccountVerificationForm } from '@/types';

interface RecoverAccountProps {
  accountType: 'email' | 'phone';
  onSubmit: SubmitHandler<EmployerAccountVerificationForm>;
  handleAccountTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// TODO - 휴대폰 인증
export default function RecoverAccount({ accountType, handleAccountTypeChange, onSubmit }: RecoverAccountProps) {
  const { handleSubmit, formState } = useFormContext<EmployerAccountVerificationForm>();

  return (
    <S.RecoverAccount>
      <h1 className="md:md-[50px] mb-[30px] text-center text-[22px] font-semibold md:text-3xl">아이디 찾기</h1>

      <S.ContentBox>
        <p className="mb-5 text-[20px] font-medium">인증방법 선택</p>

        <div className="button-group">
          <RadioButton
            checked={accountType === 'email'}
            name="account"
            onChange={handleAccountTypeChange}
            label="이메일로 찾기"
            value="email"
            margin="0 15px 0 0"
          />
          {/* <RadioButton
            checked={accountType === 'phone'}
            name="account"
            onChange={handleAccountTypeChange}
            label="휴대폰 번호로 찾기"
            value="phone"
          /> */}
        </div>

        <p className="text-md text-black-50 my-[30px] rounded-xl bg-gray-50 px-[20px] py-[20px]">
          가입 시 등록한 담당자 이메일로 찾기가 가능합니다.
        </p>

        {/* {accountType === 'email' && (
          <Button label="휴대폰 인증하기" variant="primary" height="50px" maxWidth="220px" margin="30px 0 0 0" type="submit" />
        )} */}

        {accountType === 'email' && (
          <S.EmailForm onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mb-[15px] text-[22px]">회원정보 입력</h3>
            <FormInput<EmployerAccountVerificationForm>
              required
              label="이름"
              name="userName"
              placeholder="이름"
              margin="0 0 30px 0"
              maxLength={10}
              disabled={formState.isSubmitting}
            />

            <FormInput<EmployerAccountVerificationForm>
              required
              label="이메일"
              name="email"
              placeholder="담당자 이메일"
              margin="0 0 30px 0"
              maxLength={30}
              disabled={formState.isSubmitting}
            />

            <Button
              label="이메일 인증 요청"
              variant="primary"
              height="50px"
              maxWidth="220px"
              margin="30px 0 0 0"
              type="submit"
              isLoading={formState.isSubmitting}
            />
          </S.EmailForm>
        )}
      </S.ContentBox>
    </S.RecoverAccount>
  );
}

const S = {
  RecoverAccount: styled.section`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.gray30};
    padding: 30px 0;
  `,
  ContentBox: styled.div`
    margin: 0 auto;
    max-width: 600px;
    background-color: #fff;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    border-radius: 15px;
    padding: 50px;
    ${(props) => props.theme.media.tablet`
      margin: 15px;
    `};
    ${(props) => props.theme.media.mobile`
      padding: 30px 20px;
    `};
    .button-group {
      display: flex;
    }
  `,
  EmailForm: styled.form`
    padding-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
};
