import styled from 'styled-components';
import Link from 'next/link';
import path from '@/constants/path';

export default function UtilityMenu() {
  return (
    <S.UtilityMenu>
      <div className="wrapper">
        {/*TODO: 다국어 지원 필요 시 추가*/}
        <Link href={path.SUPPORT_NOTICE}>고객센터</Link>
      </div>
    </S.UtilityMenu>
  );
}

const S = {
  UtilityMenu: styled.div`
    height: 25px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-content: center;
    justify-content: end;
    .wrapper {
      display: flex;
      justify-content: end;
      align-items: center;
      font-size: 13px;
      color: ${(props) => props.theme.colors.gray600};
      :hover {
        text-decoration: underline;
        color: ${(props) => props.theme.colors.black100};
      }
    }
  `,
};
