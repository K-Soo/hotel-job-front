import styled from 'styled-components';
import React from 'react';
import useAppRouter from '@/hooks/useAppRouter';
import { GENERAL_ASIDE_MENU } from '@/constants/menu';

export default function UserAsideMenu() {
  const [isOpen, setIsOpen] = React.useState<string | null>(null);
  const appRouter = useAppRouter();

  const handleClickItem = (value: string) => {
    appRouter.push(value);
  };

  return (
    <S.UserAsideMenu>
      {GENERAL_ASIDE_MENU.map((element) => {
        return (
          <S.Menu key={element.label}>
            <div className="content" onClick={() => setIsOpen((prev) => (prev === element.value ? null : element.value))}>
              <h6>{element.label}</h6>
              {element.items.length !== 0 && <i>아</i>}
            </div>
            {isOpen === element.value && (
              <>
                {element.items.map((item) => (
                  <S.Item key={item.value} onClick={() => handleClickItem(item.value)}>
                    {item.label}
                  </S.Item>
                ))}
              </>
            )}
          </S.Menu>
        );
      })}
    </S.UserAsideMenu>
  );
}

const S = {
  UserAsideMenu: styled.aside`
    /* width: 100%; */
    width: 220px;
    padding: 15px 0;
    margin-right: 30px;
    font-size: 14px;
    ${(props) => props.theme.media.tablet`
      display: none;
    `};
  `,
  Menu: styled.div`
    margin-bottom: 15px;
    border-bottom: 1px solid #999;
    .content {
      min-height: 40px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding: 0 10px;
      cursor: pointer;
      border-radius: 5px;
      &:hover {
        background-color: #fafafa;
      }
    }
  `,
  Item: styled.div`
    height: 40px;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 0 10px;
    background-color: #fafafa;
    display: flex;
    align-items: center;
    cursor: pointer;
  `,
};
