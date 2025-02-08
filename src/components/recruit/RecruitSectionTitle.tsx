import styled from 'styled-components';

interface RecruitSectionTitleProps {
  title: string;
  count?: number;
  margin?: string;
}

export default function RecruitSectionTitle({ title, margin, count = 0 }: RecruitSectionTitleProps) {
  return (
    <S.RecruitSectionTitle $margin={margin}>
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
  RecruitSectionTitle: styled.div<{ $margin?: string }>`
    display: flex;
    align-items: end;
    margin: ${(props) => props.$margin ?? '0 0 10px 0'};
    font-weight: 500;
    color: ${(props) => props.theme.colors.black400};
    .title {
      font-size: 24px;
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
