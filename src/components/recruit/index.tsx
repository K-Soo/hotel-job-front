import styled from "styled-components";

interface RecruitProps {
  children: React.ReactNode;
}

export default function Recruit({ children }: RecruitProps) {
  return (
    <S.Recruit>
      {children}
      {/* 지역 */}
      {/* 직종 */}
      {/* 검색 기능 */}
    </S.Recruit>
  );
}

const S = {
  Recruit: styled.section`
    height: 100px;
  `,
};
