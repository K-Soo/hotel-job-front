import styled from "styled-components";

interface PopularKeywordProps {}

const POPULAR = ["부부팀", "당번", "메이드"];

export default function PopularKeyword({}: PopularKeywordProps) {
  return (
    <S.PopularKeyword>
      <h3 className="title">인기 검색어</h3>
      <div className="items">
        {POPULAR.map((element) => (
          <span className="items__item" key={element}>
            {element}
          </span>
        ))}
      </div>
    </S.PopularKeyword>
  );
}

const S = {
  PopularKeyword: styled.div`
    margin-top: 10px;
    .title {
      font-weight: 500;
      margin-bottom: 5px;
      font-size: 16px;
    }
    .items {
      display: flex;
      &__item {
        margin-right: 10px;
        border: 1px solid #999;
        padding: 5px 15px;
        border-radius: 15px;
        font-size: 14px;
        cursor: pointer;
      }
    }
  `,
};
