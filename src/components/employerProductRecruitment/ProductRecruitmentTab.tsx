import styled from 'styled-components';
import { RECRUITMENT_PRODUCT_TYPE } from '@/constants/product';
import { motion } from 'framer-motion';
import { ParsedUrlQuery } from 'querystring';
import { ProductRecruitmentQuery, RecruitmentQueryStatus } from '@/types/API';
import { useRouter } from 'next/router';
import { selectProductAtom } from '@/recoil/product';
import { useResetRecoilState } from 'recoil';

interface ProductRecruitmentTabProps {}

interface Query extends ParsedUrlQuery {
  type?: ProductRecruitmentQuery;
}

export default function ProductRecruitmentTab({}: ProductRecruitmentTabProps) {
  const resetSelectProductAtomState = useResetRecoilState(selectProductAtom);
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
          {value}상품
        </motion.button>
      ))}
    </S.ProductRecruitmentTab>
  );
}

const S = {
  ProductRecruitmentTab: styled.div`
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 30px;
    width: 100%;
    color: ${(props) => props.theme.colors.gray900};
    .tab {
      cursor: pointer;
      margin-right: 30px;
    }
    &:last-child {
      margin-right: 0;
    }
  `,
};
