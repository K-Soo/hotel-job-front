import styled from 'styled-components';
import { RECRUITMENT_PRODUCT_TYPE } from '@/constants/product';
import { motion } from 'framer-motion';
import { ParsedUrlQuery } from 'querystring';
import { ProductRecruitmentQuery, RecruitmentQueryStatus } from '@/types/API';
import { useRouter } from 'next/router';
import { selectProductAtom, productFocusAtom } from '@/recoil/product';
import { useResetRecoilState } from 'recoil';

interface ProductRecruitmentTabProps {}

interface Query extends ParsedUrlQuery {
  type?: ProductRecruitmentQuery;
}

export default function ProductRecruitmentTab({}: ProductRecruitmentTabProps) {
  const resetSelectProductAtomState = useResetRecoilState(selectProductAtom);
  const resetProductFocusAtom = useResetRecoilState(productFocusAtom);
  const router = useRouter();
  const { type = 'MAIN' } = router.query as Query;

  const handleClickTab = (paramValue: string) => {
    const urlSearchParams = new URLSearchParams(router.query as Record<string, string>);
    const lowerCaseParamValue = paramValue.toLowerCase();

    if (lowerCaseParamValue === 'main') {
      urlSearchParams.delete('type');
    } else {
      urlSearchParams.set('type', lowerCaseParamValue);
    }

    router.replace({
      pathname: router.pathname,
      query: Object.fromEntries(urlSearchParams),
    });
    resetSelectProductAtomState();
    resetProductFocusAtom();
  };

  return (
    <S.ProductRecruitmentTab>
      {Object.entries(RECRUITMENT_PRODUCT_TYPE).map(([key, value]) => (
        <motion.button
          className="tab"
          key={key}
          initial={{ color: '#444' }}
          onClick={() => handleClickTab(key)}
          animate={{ color: type.toUpperCase() === key ? '#1b64da' : '#444' }}
        >
          <span>{value}상품</span>
          {type.toUpperCase() === key && <span className="underline" />}
        </motion.button>
      ))}
    </S.ProductRecruitmentTab>
  );
}

const S = {
  ProductRecruitmentTab: styled.div`
    font-size: 28px;
    font-weight: 500;
    margin-bottom: 50px;
    width: 100%;
    color: ${(props) => props.theme.colors.gray900};
    .tab {
      cursor: pointer;
      margin-right: 30px;
      position: relative;
      .underline {
        position: absolute;
        bottom: -2px;
        left: 0;
        border-bottom: 2px solid #1b64da;
        width: 100%;
      }
    }
    &:last-child {
      margin-right: 0;
    }
  `,
};
