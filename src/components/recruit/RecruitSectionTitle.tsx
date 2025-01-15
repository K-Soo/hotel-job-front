import styled from 'styled-components';

interface RecruitSectionTitleProps {
  title: string;
  count?: number;
}

export default function RecruitSectionTitle({ title, count = 0 }: RecruitSectionTitleProps) {
  return (
    <S.RecruitSectionTitle>
      <h3 className="title">{title}</h3>
      {count !== 0 && (
        <span className="count-box">
          <em>{count}</em>
          <span className="count-box__gun">건</span>
        </span>
      )}
    </S.RecruitSectionTitle>
  );
}

const S = {
  RecruitSectionTitle: styled.div`
    display: flex;
    align-items: end;
    margin-bottom: 10px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.black400};
    .title {
      font-size: 26px;
      padding-right: 8px;
    }
    .count-box {
      font-size: 24px;
      letter-spacing: 1px;
      em {
        color: ${(props) => props.theme.colors.blue800};
      }
      &__gun {
        font-weight: 400;
        padding-left: 1px;
      }
    }
  `,
};
