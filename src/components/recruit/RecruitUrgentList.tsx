import styled from 'styled-components';

interface RecruitUrgentListProps {
  children: React.ReactNode;
}

export default function RecruitUrgentList({ children }: RecruitUrgentListProps) {
  return <S.RecruitUrgentList>{children}</S.RecruitUrgentList>;
}

const S = {
  RecruitUrgentList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 50px;
  `,
};
