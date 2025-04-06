import styled from 'styled-components';
import ProductPreview from '@/components/employerProductRecruitment/ProductPreview';
import { ParsedUrlQuery } from 'querystring';
import { ProductRecruitmentQuery } from '@/types/API';
import { useRouter } from 'next/router';

interface Query extends ParsedUrlQuery {
  type?: ProductRecruitmentQuery;
}

const TITLE = {
  MAIN: '채용 성공의 첫걸음',
  RECRUIT: '주목받는 지면 광고',
};

const SUB_TITLE = {
  MAIN: '메인 첫 페이지에서 모든 방문자에게 대대적으로 공고를 홍보하는 상품',
  RECRUIT: '채용 페이지 가성비 최고의 채용 광고! 적은 비용으로 더 많은 지원자를 확보하세요.',
} as const;

interface EmployerProductRecruitmentProps {
  children: React.ReactNode;
}

// TODO  - loading
export default function EmployerProductRecruitment({ children }: EmployerProductRecruitmentProps) {
  const router = useRouter();
  const { type = 'MAIN' } = router.query as Query;

  return (
    <S.EmployerProductRecruitment>
      <S.Header>
        <h1 className="title">{type.toUpperCase() === 'MAIN' ? TITLE.MAIN : TITLE.RECRUIT}</h1>
        <p className="sub-title">{type.toUpperCase() === 'MAIN' ? SUB_TITLE.MAIN : SUB_TITLE.RECRUIT}</p>
      </S.Header>

      <div className="product-container">
        <ProductPreview />
        <div className="product-container__list">{children}</div>
      </div>
    </S.EmployerProductRecruitment>
  );
}

const S = {
  EmployerProductRecruitment: styled.section`
    .product-container {
      display: flex;
      &__list {
        width: 100%;
        margin-left: 30px;
      }
    }
  `,
  Header: styled.div`
    margin-bottom: 30px;
    .title {
      font-size: 22px;
      font-weight: 500;
    }
    .sub-title {
      margin-top: 10px;
      font-size: 16px;
      color: ${(props) => props.theme.colors.gray700};
      font-weight: 500;
    }
  `,
};
