import styled from 'styled-components';
import React from 'react';
import useAppRouter from '@/hooks/useAppRouter';
import { GENERAL_ASIDE_MENU } from '@/constants/menu';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/icons/Icon';

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
            <motion.div
              className="menu-item"
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsOpen((prev) => (prev === element.value ? null : element.value))}
            >
              <h6>{element.label}</h6>
              {element.items.length !== 0 && <Icon name="ArrowRight16x16" width="16px" height="16px" />}
            </motion.div>

            <AnimatePresence>
              {isOpen === element.value && (
                <motion.div
                  animate={{ height: 'auto', opacity: 1 }}
                  initial={{ height: 0, opacity: 0 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  {element.items.map((item) => (
                    <S.Item
                      key={item.value}
                      onClick={() => handleClickItem(item.value)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.05, ease: 'easeIn' }}
                    >
                      <div className="content">{item.label}</div>
                    </S.Item>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </S.Menu>
        );
      })}
    </S.UserAsideMenu>
  );
}

const S = {
  UserAsideMenu: styled.aside`
    position: sticky;
    top: 65px;
    width: 220px;
    margin-right: 30px;
    font-size: 14px;
    overflow-y: auto;
    max-height: calc(100vh - 65px);
    height: 100%;
    scrollbar-width: thin;
    scrollbar-color: #eaeaea #0000;
    scrollbar-gutter: stable;
    user-select: none;
    ${(props) => props.theme.media.tablet`
      display: none;
    `};
  `,
  Menu: styled(motion.div)`
    .menu-item {
      min-height: 40px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      cursor: pointer;
      border-radius: 5px;
      font-size: 14px;
      color: ${(props) => props.theme.colors.gray700};
      &:hover {
        background-color: ${(props) => props.theme.colors.grayOpacity100};
        color: ${(props) => props.theme.colors.black100};
        transition: all 0.5s;
      }
    }
  `,
  Item: styled(motion.div)`
    height: 40px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-left: 1px solid ${(props) => props.theme.colors.gray500};
    margin-left: 15px;
    .content {
      border-radius: 5px;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 10px;
      font-size: 14px;
      color: ${(props) => props.theme.colors.gray700};
      &:hover {
        color: ${(props) => props.theme.colors.black100};
        transition: all 0.5s;
      }
    }
  `,
};
