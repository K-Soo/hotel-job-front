import styled from 'styled-components';
import Link from 'next/link';
import path from '@/constants/path';

export default function SupportAsideMenu() {
  return (
    <S.SupportAsideMenu>
      <div className="support-header">
        <h2 className="support-header__title">고객센터</h2>
      </div>
      <S.Menu>
        <Link className="item" href={path.SUPPORT_NOTICE}>
          공지사항
        </Link>
        {/* <Link className="item" href={path.SUPPORT_FAQ}>
          FAQ
        </Link> */}
      </S.Menu>
    </S.SupportAsideMenu>
  );
}

const S = {
  SupportAsideMenu: styled.aside`
    width: 220px;
    .support-header {
      &__title {
        font-size: 24px;
        font-weight: 600;
        color: ${(props) => props.theme.colors.gray800};
      }
    }
  `,
  Menu: styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  `,
};
