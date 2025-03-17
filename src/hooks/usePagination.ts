import React, { useEffect } from 'react';
import { PaginationInfo } from '@/types/API';

const MAX_PAGE_BUTTON = 5;

export default function usePagination(props: PaginationInfo) {
  const { currentPage, totalPages } = props;
  const [pageGroup, setPageGroup] = React.useState<number[]>([]);

  useEffect(() => {
    const start = Math.floor((currentPage - 1) / MAX_PAGE_BUTTON) * MAX_PAGE_BUTTON;
    const arr = new Array(MAX_PAGE_BUTTON).fill(null).map((_, idx) => start + idx + 1);

    if (arr.includes(totalPages)) {
      const targetIndex = arr.indexOf(totalPages);
      if (targetIndex !== 0) return setPageGroup(arr.slice(0, targetIndex + 1));
      if (targetIndex === 0) return setPageGroup(arr.slice(0, 1));
    }
    if (totalPages === 0) {
      return setPageGroup([1]);
    }
    return setPageGroup(arr);
  }, [currentPage, totalPages]);

  return {
    pageGroup,
  };
}
