import styled from "styled-components";

interface AccountMenuProps {}

export default function AccountMenu({}: AccountMenuProps) {
  return <S.AccountMenu>AccountMenu</S.AccountMenu>;
}

const S = {
  AccountMenu: styled.div`
    max-width: 250px;
    width: 100%;
    border: 1px solid red;
    ${(props) => props.theme.tablet`
    `};
  `,
};
