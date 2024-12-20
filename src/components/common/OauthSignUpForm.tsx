import styled from 'styled-components';

interface OauthSignUpFormProps {
  children: React.ReactNode;
}

export default function OauthSignUpForm({ children }: OauthSignUpFormProps) {
  return (
    <S.OauthSignUpForm>
      <h6>제목</h6>
      {children}
    </S.OauthSignUpForm>
  );
}

const S = {
  OauthSignUpForm: styled.section`
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
    border: 1px solid red;
    height: 100%;
  `,
};
