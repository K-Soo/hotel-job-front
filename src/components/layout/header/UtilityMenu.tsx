import styled from "styled-components";

interface UtilityMenuProps {}

export default function UtilityMenu({}: UtilityMenuProps) {
  return <S.UtilityMenu>UtilityMenu</S.UtilityMenu>;
}

const S = {
  UtilityMenu: styled.div`
    height: 30px;
    max-width: 1080px;
    margin: 0 auto;
  `,
};
