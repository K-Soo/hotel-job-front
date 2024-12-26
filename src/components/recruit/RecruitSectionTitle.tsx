import styled from 'styled-components';

interface RecruitSectionTitleProps {
  title: string;
  count: number;
}

export default function RecruitSectionTitle({ title, count = 0 }: RecruitSectionTitleProps) {
  return (
    <S.RecruitSectionTitle>
      <h3 className="title">{title}</h3>
      <span>총 {count}건</span>
    </S.RecruitSectionTitle>
  );
}

const S = {
  RecruitSectionTitle: styled.div`
    display: flex;
    align-items: end;
    .title {
      font-size: 20px;
      padding-right: 10px;
    }
  `,
};
