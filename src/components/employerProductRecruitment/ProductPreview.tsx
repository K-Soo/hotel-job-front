import React from 'react';
import styled from 'styled-components';
import { motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { ProductRecruitmentQuery } from '@/types/API';
import { productFocusAtom } from '@/recoil/product';
import { useRecoilValue, useRecoilState } from 'recoil';

interface Query extends ParsedUrlQuery {
  type?: ProductRecruitmentQuery;
}

export default function ProductPreview() {
  const [tab, setTab] = React.useState<'pc' | 'mobile'>('pc');

  const router = useRouter();
  const { type = 'MAIN' } = router.query as Query;

  const productFocusAtomState = useRecoilValue(productFocusAtom);

  React.useEffect(() => {
    setTab('pc');
  }, [router]);

  const controls = useAnimationControls();

  const imageRef = React.useRef(null);

  const handleClickTab = (value: string) => {
    setTab(value as 'pc' | 'mobile');
  };

  React.useEffect(() => {
    const isMobile = tab === 'mobile';

    if (productFocusAtomState.product === 'DEFAULT') {
      controls.start({ y: 0, x: 0, scale: 1, transition: { duration: 0.2 } });
    }

    if (productFocusAtomState.product === 'SPECIAL') {
      controls.start({ y: isMobile ? 0 : 50, x: isMobile ? 0 : 200, scale: isMobile ? 1 : 2, transition: { duration: 0.2 } });
    }

    if (productFocusAtomState.product === 'URGENT') {
      controls.start({ y: isMobile ? -500 : -100, x: isMobile ? 0 : 200, scale: isMobile ? 1 : 2, transition: { duration: 0.2 } });
    }
    if (productFocusAtomState.product === 'BASIC') {
      controls.start({ y: isMobile ? -900 : -150, x: isMobile ? 0 : 200, scale: isMobile ? 1 : 2, transition: { duration: 0.2 } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productFocusAtomState, tab]);

  return (
    <S.ProductPreview>
      <S.PreviewTab>
        <motion.button
          className="item"
          onClick={() => handleClickTab('pc')}
          initial={{ backgroundColor: '#FFFFFF' }}
          animate={tab === 'pc' ? { backgroundColor: '#3182f6', color: '#ffffff' } : { backgroundColor: '#f2f4f6', color: '#8b95a1' }}
          transition={{ duration: 0 }}
        >
          PC 광고
        </motion.button>
        <motion.button
          className="item"
          onClick={() => handleClickTab('mobile')}
          initial={{ backgroundColor: '#FFFFFF' }}
          animate={tab === 'mobile' ? { backgroundColor: '#3182f6', color: '#ffffff' } : { backgroundColor: '#f2f4f6', color: '#8b95a1' }}
          transition={{ duration: 0 }}
        >
          모바일 광고
        </motion.button>
      </S.PreviewTab>

      <S.ImageContent>
        <motion.div className="image-box" ref={imageRef} animate={controls} initial={undefined}>
          <Image height={1200} width={370} alt="preview" src={`/images/product/${type.toLowerCase()}/${tab}/view.png`} quality={100} />
        </motion.div>
      </S.ImageContent>
    </S.ProductPreview>
  );
}

const S = {
  ProductPreview: styled.div`
    flex: 0 0 370px;
  `,
  ImageContent: styled.div`
    position: relative;
    height: 665px;
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 5px;
    overflow: hidden;
    font-size: 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid ${(props) => props.theme.colors.gray};
    .image-box {
      width: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  `,
  PreviewTab: styled.div`
    height: 50px;
    margin-bottom: 30px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    padding: 3px 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.theme.colors.gray100};
    .item {
      flex: 1;
      text-align: center;
      cursor: pointer;
      height: 100%;
      margin: 3px;
      border-radius: 5px;
      color: ${(props) => props.theme.colors.gray700};
    }
  `,
};
