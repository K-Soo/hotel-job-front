import styled from 'styled-components';
import { PaginationInfo } from '@/types/API';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import usePagination from '@/hooks/usePagination';
import Icon from '@/icons/Icon';
import IconDimmed from '@/components/common/IconDimmed';
interface PaginationComponentProps {
  margin?: string;
  pagination: PaginationInfo;
}

export default function PaginationComponent({ margin, pagination }: PaginationComponentProps) {
  const { currentPage, totalPages, nextPage, prevPage } = pagination;
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

  const handleClickPrevArrow = () => {
    const urlSearchParams = new URLSearchParams(params);
    if (!prevPage) return;
    urlSearchParams.set('page', String(prevPage));
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

  const handleClickNextArrow = () => {
    const urlSearchParams = new URLSearchParams(params);
    if (!nextPage) return;
    urlSearchParams.set('page', String(nextPage));
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
      <button className="arrow" disabled={!prevPage} onClick={handleClickPrevArrow}>
        <Icon
          name="ArrowRight16x16"
          width="16px"
          height="16px"
          style={{ transform: 'rotate(180deg)', color: prevPage ? '#000' : '#999', cursor: prevPage ? 'pointer' : 'default' }}
        />
      </button>

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
            }}
            transition={{ duration: 0.1 }}
          >
            {element}
          </S.Page>
        ))}
      </S.PageNumbers>

      <button className="arrow" disabled={currentPage === totalPages} onClick={handleClickNextArrow}>
        <Icon
          name="ArrowRight16x16"
          width="16px"
          height="16px"
          style={{ color: currentPage === totalPages ? '#999' : '#000', cursor: currentPage === totalPages ? 'default' : 'pointer' }}
        />
      </button>
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
    .arrow {
      font-size: 0;
    }
  `,
  PageNumbers: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
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
    margin: 0 8px;
    cursor: pointer;
  `,
};
