import styled from 'styled-components';

interface RecruitPremiumListProps {
  children: React.ReactNode;
}

export default function RecruitPremiumList({ children }: RecruitPremiumListProps) {
  return <S.RecruitPremiumList>{children}</S.RecruitPremiumList>;
}

const S = {
  RecruitPremiumList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 50px;
  `,
};
