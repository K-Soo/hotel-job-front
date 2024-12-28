import styled from 'styled-components';
import ProductSectionPreview from '@/components/employerProductSection/ProductSectionPreview';
import ProductSectionCard from '@/components/employerProductSection/ProductSectionCard';
import ChoiceDeviceFilter from '@/components/common/employer/ChoiceDeviceFilter';

interface EmployerProductSectionProps {
  children: React.ReactNode;
}

export default function EmployerProductSection({ children }: EmployerProductSectionProps) {
  return (
    <S.EmployerProductSection>
      {children}
      <S.Header>
        <h1 className="title">주목받는 지면 광고 - 채용 페이지</h1>
        <p className="sub-title">대표 채용정보 TOP 3로 가장 효과적인 홍보를 시작하세요. 구직자의 눈길을 사로잡는 최적의 선택!</p>
      </S.Header>

      <S.ProductFormContainer>
        <ProductSectionPreview />
        <div className="card-container">
          <ChoiceDeviceFilter margin="0 0 15px 0" />
          <ProductSectionCard title="프리미엄 공고" margin="0 0 15px 0" />
          <ProductSectionCard title="급구 공고" margin="0 0 15px 0" />
          <ProductSectionCard title="기본 공고" />
        </div>
      </S.ProductFormContainer>
    </S.EmployerProductSection>
  );
}

const S = {
  EmployerProductSection: styled.section`
    width: 100%;
  `,
  Header: styled.div`
    margin-bottom: 30px;
    .title {
      font-size: 30px;
      font-weight: 500;
    }
    .sub-title {
      margin-top: 10px;
      font-size: 16px;
      color: ${(props) => props.theme.colors.gray700};
      font-weight: 500;
    }
  `,
  ProductFormContainer: styled.div`
    display: flex;
    justify-content: center;
    .card-container {
      flex: 0 1 800px;
      margin-left: 30px;
    }
  `,
};
