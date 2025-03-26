import styled from 'styled-components';

interface PaginationTagProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationTag({ currentPage, totalPages }: PaginationTagProps) {
  return (
    <S.PaginationTag>
      <span className="count">
        {currentPage} / {totalPages}
      </span>
    </S.PaginationTag>
  );
}

const S = {
  PaginationTag: styled.div`
    .count {
      background-color: ${({ theme }) => theme.colors.gray500};
      color: ${({ theme }) => theme.colors.white};
      padding: 3px 10px;
      border-radius: 30px;
      font-size: 14px;
    }
  `,
};
