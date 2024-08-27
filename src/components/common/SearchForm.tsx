import styled from "styled-components";
import Icon from "@/icons/Icon";

interface SearchFormProps {}

export default function SearchForm({}: SearchFormProps) {
  return (
    <S.SearchForm>
      <Icon className="search-icon" name="Search" style={{ stroke: "#666" }} />
      <input type="text" className="filed" placeholder="Search" />
    </S.SearchForm>
  );
}

const S = {
  SearchForm: styled.div`
    height: 48px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    position: relative;
    .search-icon {
      position: absolute;
      top: 50%;
      left: 8px;
      transform: translateY(-50%);
    }
    .filed {
      all: unset;
      height: 100%;
      width: 100%;
      padding-left: 50px;
    }
  `,
};
