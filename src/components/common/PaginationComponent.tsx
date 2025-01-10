import styled from 'styled-components';
import { ParsedUrlQuery } from 'querystring';
import { PaginationInfo } from '@/types/API';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import usePagination from '@/hooks/usePagination';

interface PaginationComponentProps {
  margin?: string;
  pagination: PaginationInfo;
}

interface Query extends ParsedUrlQuery {
  page?: string;
}

export default function PaginationComponent({ margin, pagination }: PaginationComponentProps) {
  const { currentPage, totalPages } = pagination;
  const router = useRouter();
  const [pathname, params] = router.asPath.split('?');

  const { pageGroup } = usePagination(pagination);

  const handleClickPage = (pageNumber: string) => {
    const urlSearchParams = new URLSearchParams(params);
    urlSearchParams.set('page', pageNumber);
    const paramsObj = Object.fromEntries(urlSearchParams);

    return router.replace(
      {
        pathname: pathname,
        query: paramsObj,
      },
      undefined,
      { scroll: false },
    );
  };

  return (
    <S.PaginationComponent $margin={margin}>
      <button disabled={currentPage === 1}>arrow</button>

      <S.PageNumbers>
        {pageGroup.map((element) => (
          <S.Page
            key={element}
            onClick={() => handleClickPage(String(element))}
            whileHover={{
              backgroundColor: element === currentPage ? '#3182f6' : '#f7f7f7',
            }}
            animate={{
              color: element === currentPage ? '#FFFFFF' : '#8b95a1',
              backgroundColor: element === currentPage ? '#3182f6' : '#FFFFFF',
              border: element === currentPage ? '#3182f6' : '1px solid #8b95a1',
            }}
          >
            {element}
          </S.Page>
        ))}
      </S.PageNumbers>

      <button disabled={currentPage === totalPages}>arrow</button>
    </S.PaginationComponent>
  );
}

const S = {
  PaginationComponent: styled.div<{ $margin?: string }>`
    margin: ${(props) => props.$margin || '10px 0 0 0'};
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  PageNumbers: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 15px;
  `,
  Page: styled(motion.button)`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    border-radius: 50%;
    margin: 0 5px;
    border: 1px solid ${(props) => props.theme.colors.gray500};
    cursor: pointer;
  `,
};
