import styled from 'styled-components';
import Icon from '@/icons/Icon';

interface EmployerQuickMenuProps {}

export default function EmployerQuickMenu({}: EmployerQuickMenuProps) {
  return (
    <S.EmployerQuickMenu>
      <div className="quick-menu-container">
        <div className="item">
          <Icon name="Bill24x24" width="24px" height="24px" />
          <span>12</span>
        </div>

        <div className="item">
          <Icon name="Bookmark24x24" width="24px" height="24px" />
          <span>12</span>
        </div>
      </div>
    </S.EmployerQuickMenu>
  );
}

const S = {
  EmployerQuickMenu: styled.div`
    /* border: 1px solid red; */
    height: 50px;
    /* display: flex;
    align-items: center;
    width: 100%; */
    .quick-menu-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      /* border: 1px solid red; */
      .item {
        /* height: 100%; */
        height: 50px;
        width: 50px;
        display: flex;
        align-content: center;
        justify-content: center;
        /* border: 1px solid red; */
        font-size: 0;
        span {
          height: fit-content;
          font-size: 15px;
          /* border: 1px solid red; */
        }
      }
    }
  `,
};
