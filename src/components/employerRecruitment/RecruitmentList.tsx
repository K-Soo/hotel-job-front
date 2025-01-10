import styled from 'styled-components';

interface RecruitmentListProps {
  children: React.ReactNode;
}

export default function RecruitmentList({ children }: RecruitmentListProps) {
  return <S.RecruitmentList>{children}</S.RecruitmentList>;
}

const S = {
  RecruitmentList: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  `,
};
