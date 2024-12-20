import styled from 'styled-components';
import Logo from '@/components/common/Logo';

interface UtilityMenuProps {}

export default function UtilityMenu({}: UtilityMenuProps) {
  return (
    <S.UtilityMenu>
      <Logo size="small" />
    </S.UtilityMenu>
  );
}

const S = {
  UtilityMenu: styled.div`
    height: 40px;
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    align-content: center;
  `,
};
