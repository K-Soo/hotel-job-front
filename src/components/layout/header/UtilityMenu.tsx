import styled from 'styled-components';
import Logo from '@/components/common/Logo';

interface UtilityMenuProps {}

export default function UtilityMenu({}: UtilityMenuProps) {
  return <S.UtilityMenu></S.UtilityMenu>;
}

const S = {
  UtilityMenu: styled.div`
    height: 35px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-content: center;
  `,
};
