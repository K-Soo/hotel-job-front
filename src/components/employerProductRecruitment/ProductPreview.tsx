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
  const productFocusAtomValue = useRecoilValue(productFocusAtom);
  const [productFocusAtomState, setProductFocusAtomState] = useRecoilState(productFocusAtom);

  React.useEffect(() => {
    setTab('pc');
  }, [router]);

  const controls = useAnimationControls();
  const imageRef = React.useRef(null);

  const handleClickTab = (value: string) => {
    setTab(value as 'pc' | 'mobile');
    // setProductFocusAtomState({ product: 'DEFAULT' });

    if (tab === 'mobile') {
      return controls.start({ y: -200, transition: { duration: 0.2 } });
    }
    return controls.start({ y: -300, transition: { duration: 0.2 } });
  };

  return (
    <S.ProductPreview>
      <div className="preview-tab">
        <motion.button
          className="preview-tab__item"
          onClick={() => handleClickTab('pc')}
          initial={{ backgroundColor: '#FFFFFF' }}
          animate={tab === 'pc' ? { backgroundColor: '#f2f4f6', color: '#2272eb' } : { backgroundColor: '#FFFFFF', color: '#8b95a1' }}
          whileHover={{
            color: '#2272eb',
          }}
        >
          PC 광고
        </motion.button>
        <motion.button
          className="preview-tab__item"
          onClick={() => handleClickTab('mobile')}
          initial={{ backgroundColor: '#FFFFFF' }}
          animate={tab === 'mobile' ? { backgroundColor: '#f2f4f6', color: '#2272eb' } : { backgroundColor: '#FFFFFF', color: '#8b95a1' }}
          whileHover={{
            color: '#2272eb',
          }}
        >
          모바일 광고
        </motion.button>
      </div>
      <motion.div className="image-container">
        <motion.div className="image-box" ref={imageRef} animate={controls} initial={undefined}>
          <Image
            height={1200}
            width={370}
            alt="preview"
            src={`/images/product/${tab}/${type.toLowerCase()}/${productFocusAtomState.product?.toLocaleLowerCase()}.png`}
          />
        </motion.div>
      </motion.div>
    </S.ProductPreview>
  );
}

const S = {
  ProductPreview: styled.div`
    flex: 0 0 370px;
    .preview-tab {
      height: 50px;
      border: 1px solid ${(props) => props.theme.colors.gray500};
      margin-bottom: 15px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      overflow: hidden;
      padding: 3px 0;
      &__item {
        flex: 1;
        text-align: center;
        cursor: pointer;
        height: 100%;
        margin: 3px;
        border-radius: 5px;
        color: ${(props) => props.theme.colors.gray700};
      }
    }
    .image-container {
      height: 730px;
      border: 1px solid ${(props) => props.theme.colors.gray500};
      background-color: ${(props) => props.theme.colors.white};
      border-radius: 5px;
      overflow: hidden;
      .image-box {
        width: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  `,
};
