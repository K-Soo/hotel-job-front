import styled from 'styled-components';

interface RecruitUrgentListProps {
  children: React.ReactNode;
}

export default function RecruitUrgentList({ children }: RecruitUrgentListProps) {
  return <S.RecruitUrgentList>{children}</S.RecruitUrgentList>;
}

const S = {
  RecruitUrgentList: styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: minmax(200px, auto);
    margin-bottom: 100px;
    gap: 1px;
    ${(props) => props.theme.media.laptop`
      margin: 0 15px 100px 15px;
    `};
    @media (max-width: 1024px) {
      grid-auto-rows: minmax(180px, auto);
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 900px) {
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: minmax(205px, auto);
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: minmax(205px, auto);
    }

    @media (max-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: minmax(190px, auto);
    }

    @media (max-width: 400px) {
      grid-template-columns: repeat(1, 1fr);
      grid-auto-rows: minmax(180px, auto);
    }
  `,
};
