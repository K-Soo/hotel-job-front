import styled from 'styled-components';
import { motion, useAnimationControls } from 'framer-motion';
import React from 'react';
import { EMPLOYER_ASIDE_MENU } from '@/constants/menu';
import Icon, { IconType } from '@/icons/Icon';
import { useRouter } from 'next/router';

export function EmployerAside() {
  const [isOpen, setIsOpen] = React.useState<string | null>(null);
  const [isExpanded, setIsExpanded] = React.useState(true);
  const router = useRouter();
  const asideRef = React.useRef<HTMLElement>(null);
  const controls = useAnimationControls();

  const handleClickResize = () => {
    setIsExpanded((prev) => !prev);
    controls.start({
      width: isExpanded ? 60 : 220,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    });
    setIsOpen(null);
  };

  const handleClickMenu = (label: string, value: string) => {
    if (value) router.push(value);
    setIsExpanded(true);
    if (!isExpanded) {
      controls.start({
        width: isExpanded ? 60 : 220,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
      });
    }

    setIsOpen((prev) => (prev === label ? null : label));
  };

  return (
    <S.EmployerAside ref={asideRef} animate={controls} initial={{ width: '220px' }}>
      <S.ResizeButton className="resize-button" onClick={handleClickResize}>
        <Icon name={isExpanded ? 'MinimizeSquare24x24' : 'MaximizeSquare24x24'} width="24px" height="24px" />
      </S.ResizeButton>

      {EMPLOYER_ASIDE_MENU.map((element) => {
        return (
          <S.Menu key={element.label} onClick={() => handleClickMenu(element.label, element.value)}>
            <S.MenuItem>
              <motion.div className="item-wrapper" whileTap={{ scale: 0.98 }}>
                <Icon name={element.icon as IconType} width="24px" height="24px" />
                <h6 className="title">{element.label}</h6>
              </motion.div>
              {element.items.length !== 0 && <Icon className="arrow-icon" name="ArrowRight16x16" width="16px" height="16px" />}
            </S.MenuItem>

            {isOpen === element.label && (
              <React.Fragment>
                {element.items.map((item) => (
                  <S.MenuItemChild key={item.label} onClick={() => router.push(item.value)}>
                    <div className="content">{item.label}</div>
                  </S.MenuItemChild>
                ))}
              </React.Fragment>
            )}
          </S.Menu>
        );
      })}
    </S.EmployerAside>
  );
}

const S = {
  EmployerAside: styled(motion.aside)`
    background-color: ${(props) => props.theme.colors.white};
    padding: 15px 4px 15px 10px;
    font-size: 15px;
    overflow-y: auto;
    position: sticky;
    top: 60px;
    height: calc(100vh - 60px - 50px);
    min-height: 100%;
    user-select: none;
    scrollbar-width: thin;
    scrollbar-color: #eaeaea #fafafa;
    svg {
      flex-shrink: 0;
    }
  `,
  ResizeButton: styled.button`
    padding: 0 10px;
    display: flex;
    align-items: center;
    height: 40px;
    width: 100%;
    cursor: pointer;
    border-radius: 5px;
    .resize-text {
      padding-left: 10px;
      white-space: nowrap;
      overflow: hidden;
    }
    &:hover {
      background-color: ${(props) => props.theme.colors.gray100};
      transition: all 0.5s;
    }
  `,
  Menu: styled(motion.div)``,
  MenuItem: styled(motion.div)`
    min-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    overflow: hidden;
    white-space: nowrap;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 5px;
    margin: 5px 0;
    color: ${(props) => props.theme.colors.gray800};
    &:hover {
      background-color: ${(props) => props.theme.colors.blue50};
      color: ${(props) => props.theme.colors.blue500};
      transition: all 0.5s;
    }
    .item-wrapper {
      display: flex;
      align-items: center;
      cursor: pointer;
      width: 100%;
    }
    .title {
      padding-left: 11px;
    }
    .arrow-icon {
      flex-shrink: 1;
    }
  `,
  MenuItemChild: styled.div`
    height: 40px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 5px;
    white-space: nowrap;
    margin-left: 15px;
    padding-left: 30px;
    &:hover {
      color: ${(props) => props.theme.colors.blue500};
      background-color: ${(props) => props.theme.colors.blue50};
      transition: all 0.5s;
    }
  `,
};
