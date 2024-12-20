import React from 'react';
import styled from 'styled-components';
import { motion, useAnimationControls } from 'framer-motion';

interface SignInTabsProps<T> {
  currentTab: T;
  setTab: React.Dispatch<React.SetStateAction<T>>;
  tabsOptions: Readonly<{ label: string; value: string }[]>;
  margin?: string;
}

export default function SignInTabs<T>({ margin, currentTab, setTab, tabsOptions }: SignInTabsProps<T>) {
  const controls = useAnimationControls();
  const tabLength = tabsOptions.length;

  const containerRef = React.useRef<HTMLDivElement>(null);

  const currentLabel = tabsOptions.find((tab) => tab.value === currentTab)?.label || '';

  const calculateTogglePosition = () => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const selectedIndex = tabsOptions.findIndex((tab) => tab.value === currentTab);
    return (containerWidth / tabLength) * selectedIndex;
  };

  const handleClickTab = (value: T) => {
    setTab(value);
  };

  React.useEffect(() => {
    const position = calculateTogglePosition();
    controls.start({
      x: position,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab, controls]);

  return (
    <S.SignInTabs $margin={margin}>
      <motion.div className="container" ref={containerRef}>
        {tabsOptions.map((item) => (
          <motion.button key={item.value} className="item" value={item.value} onClick={() => handleClickTab(item.value as T)}>
            {item.label}
          </motion.button>
        ))}

        <motion.span
          className="toggle"
          initial={false}
          dragConstraints={{ left: 0, right: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          animate={controls}
        >
          {currentLabel}
        </motion.span>
      </motion.div>
    </S.SignInTabs>
  );
}

const S = {
  SignInTabs: styled.div<{ $margin?: string }>`
    height: 45px;
    width: 100%;
    margin: ${(props) => props.$margin || '0'};
    .container {
      height: 100%;
      display: flex;
      position: relative;
      border-radius: 8px; /* 버튼 모서리 둥글게 */
      background-color: ${(props) => props.theme.colors.gray100};
      color: ${(props) => props.theme.colors.gray500};
      .item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .toggle {
        position: absolute;
        background-color: ${(props) => props.theme.colors.blue100};
        color: #fff;
        height: 100%;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        height: calc(100% - 6px); /* 탭보다 3px씩 작게 */
        width: calc(50% - 6px); /* 양쪽 3px씩 줄임 */
        top: 3px; /* 중앙 정렬 */
        left: 3px; /* 중앙 정렬 */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 음영 추가 */
        z-index: 1; /* 버튼 아래로 */
      }
    }
  `,
};
