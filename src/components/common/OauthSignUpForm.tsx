import styled from 'styled-components';
import Logo from '@/components/common/Logo';
interface OauthSignUpFormProps {
  children: React.ReactNode;
}

export default function OauthSignUpForm({ children }: OauthSignUpFormProps) {
  return (
    <S.OauthSignUpForm>
      <div className="sign-up-header">
        <Logo size="middle" margin="0 0 15px 0" />
      </div>
      <h2 className="sign-up-title">이용약관 동의</h2>
      {children}
    </S.OauthSignUpForm>
  );
}

const S = {
  OauthSignUpForm: styled.section`
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    .sign-up-header {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .sign-up-title {
      margin: 30px 0 15px 0;
      font-size: 18px;
      font-weight: 500;
    }
  `,
};
