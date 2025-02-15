import styled from 'styled-components';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { motion } from 'framer-motion';

export interface UrlQuery extends ParsedUrlQuery {
  use?: 'Y' | 'N';
}

export default function CouponTab() {
  const router = useRouter();
  const { use = 'N' } = router.query as UrlQuery;
  const [pathname, params] = router.asPath.split('?');

  const handleClickTab = (value: string) => {
    const urlSearchParams = new URLSearchParams(params);

    urlSearchParams.set('use', value);

    const paramsObj = Object.fromEntries(urlSearchParams);
    router.replace(
      {
        pathname: pathname,
        query: paramsObj,
      },
      undefined,
      { scroll: false },
    );
  };

  return (
    <S.CouponTab>
      <div className="tabs">
        <motion.button
          className="tabs__item"
          onClick={() => handleClickTab('N')}
          initial={{ color: '#000' }}
          animate={{ color: use === 'N' ? '#000' : '#999' }}
        >
          보유쿠폰
        </motion.button>
        <motion.button
          className="tabs__item"
          onClick={() => handleClickTab('Y')}
          initial={{ color: '#000' }}
          animate={{ color: use === 'Y' ? '#000' : '#999' }}
        >
          사용한 쿠폰
        </motion.button>
      </div>
    </S.CouponTab>
  );
}

const S = {
  CouponTab: styled.div`
    font-size: 18px;
    height: 50px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid ${({ theme }) => theme.colors.black400};
    margin-bottom: 15px;
    .tabs {
      &__item {
        margin-right: 30px;
        cursor: pointer;
        font-weight: 500;
      }
      :last-child {
        margin-right: 0;
      }
    }
  `,
};
