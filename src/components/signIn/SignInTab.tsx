import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

interface SignInTabProps {
  tabsOptions: Readonly<{ label: string; value: string }[]>;
}

export interface UrlQuery extends ParsedUrlQuery {
  type?: string;
}

export default function SignInTab({ tabsOptions }: SignInTabProps) {
  const router = useRouter();
  const { type } = router.query as UrlQuery;

  const [pathname, params] = router.asPath.split('?');

  const containerRef = React.useRef<HTMLDivElement>(null);

  const currentTab = React.useMemo(() => {
    return tabsOptions.find((tab) => tab.value === type) || tabsOptions[0];
  }, [type, tabsOptions]);

  const handleClickTab = (value: string) => {
    const urlSearchParams = new URLSearchParams(params);

    urlSearchParams.set('type', value);
    const paramsObj = Object.fromEntries(urlSearchParams);
    router.replace({ pathname: pathname, query: paramsObj }, undefined, { scroll: false });
  };

  return (
    <S.SignInTab>
      <motion.div className="container" ref={containerRef}>
        {tabsOptions.map((item) => (
          <motion.button key={item.value} className="item" value={item.value} onClick={() => handleClickTab(item.value)}>
            <span>{item.label}</span>

            {currentTab && currentTab.value === item.value && (
              <S.ToggleButton initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                {currentTab.label}
              </S.ToggleButton>
            )}
          </motion.button>
        ))}
      </motion.div>
    </S.SignInTab>
  );
}

const S = {
  SignInTab: styled.div`
    height: 45px;
    width: 100%;
    margin-bottom: 30px;
    font-size: 16px;
    .container {
      height: 100%;
      display: flex;
      border-radius: 8px;
      background-color: ${(props) => props.theme.colors.gray100};
      color: ${(props) => props.theme.colors.gray500};
      .item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
      }
    }
  `,
  ToggleButton: styled(motion.span)`
    position: absolute;
    background-color: ${(props) => props.theme.colors.blue500};
    color: ${(props) => props.theme.colors.white};
    height: 100%;
    width: 100%;
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
