import React from 'react';
import styled from 'styled-components';
import { motion, useAnimationControls } from 'framer-motion';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

interface TabsProps {
  tabsOptions: Readonly<{ label: string; value: string }[]>;
  margin?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontColor?: string;
}

export interface UrlQuery extends ParsedUrlQuery {
  type?: string;
}

export default function Tabs({ margin, width, tabsOptions, height, backgroundColor, fontSize, fontColor }: TabsProps) {
  const controls = useAnimationControls();
  const tabLength = tabsOptions.length;
  const router = useRouter();
  const { type } = router.query as UrlQuery;

  const [pathname, params] = router.asPath.split('?');
  const urlSearchParams = new URLSearchParams(params);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const currentValue = tabsOptions.find((tab) => tab.value === type) || tabsOptions[0];

  // 탭의 너비 계산
  const calculateToggleWidth = () => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    return containerWidth / tabLength - 6; // 컨테이너 너비 ÷ 탭 개수 - 6px
  };

  // 토글 위치 계산
  const calculateTogglePosition = () => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const selectedIndex = tabsOptions.findIndex((tab) => tab.value === currentValue.value);
    return (containerWidth / tabLength) * selectedIndex;
  };

  const handleClickTab = (value: string) => {
    urlSearchParams.set('type', value);

    const paramsObj = Object.fromEntries(urlSearchParams);
    router.replace({
      pathname: pathname,
      query: paramsObj,
    });
  };

  React.useEffect(() => {
    if (router.isReady) {
      const position = calculateTogglePosition();
      const width = calculateToggleWidth();

      controls.start({
        x: position,
        width: width,
        opacity: 1,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls, router]);

  return (
    <S.Tabs $margin={margin} $width={width} $height={height} $fontSize={fontSize}>
      <motion.div className="container" ref={containerRef}>
        {tabsOptions.map((item) => (
          <motion.button key={item.value} className="item" value={item.value} onClick={() => handleClickTab(item.value)}>
            {item.label}
          </motion.button>
        ))}

        <S.ToggleButton
          style={{
            width: `0`,
          }}
          initial={{ opacity: 0 }}
          dragConstraints={{ left: 0, right: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          animate={controls}
          $backgroundColor={backgroundColor}
          $fontColor={fontColor}
        >
          {currentValue.label}
        </S.ToggleButton>
      </motion.div>
    </S.Tabs>
  );
}

const S = {
  Tabs: styled.div<{ $margin?: string; $width?: string; $height?: string; $fontSize?: string }>`
    height: ${(props) => props.$height || '45px'};
    width: ${(props) => props.$width || '100%'};
    margin: ${(props) => props.$margin || '0'};
    font-size: ${(props) => props.$fontSize || '16px'};
    .container {
      height: 100%;
      display: flex;
      position: relative;
      border-radius: 8px;
      background-color: ${(props) => props.theme.colors.gray100};
      color: ${(props) => props.theme.colors.gray500};
      .item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  `,
  ToggleButton: styled(motion.button)<{ $backgroundColor?: string; $fontColor?: string }>`
    position: absolute;
    background-color: ${(props) => props.$backgroundColor || props.theme.colors.blue500};
    color: ${(props) => props.$fontColor || props.theme.colors.white};
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    height: calc(100% - 6px);
    top: 3px;
    left: 3px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1;
  `,
};
