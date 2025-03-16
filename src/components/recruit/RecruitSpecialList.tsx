import styled from 'styled-components';

interface RecruitSpecialListProps {
  children: React.ReactNode;
}

export default function RecruitSpecialList({ children }: RecruitSpecialListProps) {
  return <S.RecruitSpecialList>{children}</S.RecruitSpecialList>;
}

const S = {
  RecruitSpecialList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 100px;
  `,
};
