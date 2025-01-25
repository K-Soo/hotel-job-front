import styled from 'styled-components';
import ProductPreview from '@/components/employerProductRecruitment/ProductPreview';
import ProductRecruitmentTab from '@/components/employerProductRecruitment/ProductRecruitmentTab';
import { ParsedUrlQuery } from 'querystring';
import { ProductRecruitmentQuery } from '@/types/API';
import { useRouter } from 'next/router';

interface Query extends ParsedUrlQuery {
  type?: ProductRecruitmentQuery;
}

interface EmployerProductRecruitmentProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export default function EmployerProductRecruitment({ isLoading, children }: EmployerProductRecruitmentProps) {
  const router = useRouter();
  const { type = 'MAIN' } = router.query as Query;

  return (
    <S.EmployerProductRecruitment>
      <ProductRecruitmentTab />
      <S.Header>
        <h1 className="title">{type.toUpperCase() === 'MAIN' ? '채용 성공의 첫걸음 - 메인 페이지' : '주목받는 지면 광고 - 채용 페이지'}</h1>
        <p className="sub-title">
          {type.toUpperCase() === 'MAIN'
            ? '구직자들이 가장 먼저 만나는 채용 공고, 지금 바로 시작하세요. 최고의 노출 효과를 보장합니다!'
            : '가성비 최고의 채용 광고! 적은 비용으로 더 많은 지원자를 확보하세요. 오늘 시작하는 채용, 내일의 성공을 보장합니다.'}
        </p>
        {/* 구직자에게 가장 먼저 보이는 공고! 탁월한 노출 효과로 당신의 채용 공고를 돋보이게 만드세요. */}
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
