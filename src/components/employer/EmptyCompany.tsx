import styled from 'styled-components';

interface EmptyCompanyProps {}

export default function EmptyCompany({}: EmptyCompanyProps) {
  return (
    <S.EmptyCompany>
      <p>회사정보가 등록되지않았거나</p>
      <p> 일시적인 오류가 발생했습니다.</p>
    </S.EmptyCompany>
  );
}

const S = {
  EmptyCompany: styled.div`
    flex-basis: 400px;
    height: 180px;
    border: 1px solid ${({ theme }) => theme.colors.gray400};
    border-radius: 10px;
    padding: 30px;
    background-color: ${({ theme }) => theme.colors.gray};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    line-height: 1.3;
    color: ${({ theme }) => theme.colors.gray600};
    font-size: 16px;
  `,
};
