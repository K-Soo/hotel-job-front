import styled from "styled-components";

interface AccountResumesCreateProps {
  children: React.ReactNode;
}

export default function AccountResumesCreate({ children }: AccountResumesCreateProps) {
  return <S.AccountResumesCreate>{children}</S.AccountResumesCreate>;
}

const S = {
  AccountResumesCreate: styled.section`
    height: 100%;
  `,
};
