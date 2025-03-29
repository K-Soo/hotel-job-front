import styled, { css } from 'styled-components';
import { PaginationInfo } from '@/types/API';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import usePagination from '@/hooks/usePagination';
import Icon from '@/icons/Icon';
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
      {totalPages > 1 && (
        <StyledPrevArrow disabled={!prevPage} onClick={handleClickPrevArrow} $active={prevPage === null ? false : true}>
          <Icon className="arrow-icon" name="ArrowRight16x16" width="16px" height="16px" />
        </StyledPrevArrow>
      )}

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
            transition={{ duration: 0 }}
          >
            {element}
          </S.Page>
        ))}
      </S.PageNumbers>

      {totalPages > 1 && (
        <StyledNextArrow
          disabled={currentPage === totalPages}
          onClick={handleClickNextArrow}
          $active={currentPage === totalPages ? false : true}
        >
          <Icon className="arrow-icon" name="ArrowRight16x16" width="16px" height="16px" />
        </StyledNextArrow>
      )}
    </S.PaginationComponent>
  );
}

const StyledArrowCommon = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: not-allowed;
`;

const StyledPrevArrow = styled.button<{ $active: boolean }>`
  ${StyledArrowCommon}
  ${(props) =>
    props.$active &&
    css`
      cursor: pointer;
      &:hover {
        background-color: ${(props) => props.theme.colors.gray100};
      }
    `};
  .arrow-icon {
    color: #999;
    transform: rotate(180deg);
    pointer-events: none;
    ${(props) =>
      props.$active &&
      css`
        color: #000000;
      `};
  }
`;

const StyledNextArrow = styled.button<{ $active: boolean }>`
  ${StyledArrowCommon}
  ${(props) =>
    props.$active &&
    css`
      cursor: pointer;
      &:hover {
        background-color: ${(props) => props.theme.colors.gray100};
      }
    `};
  .arrow-icon {
    color: #999;
    pointer-events: none;
    ${(props) =>
      props.$active &&
      css`
        color: #000000;
      `};
  }
`;

const S = {
  PaginationComponent: styled.div<{ $margin?: string }>`
    margin: ${(props) => props.$margin || '10px 0 0 0'};
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    .arrow {
      font-size: 0;
      width: 16px;
      height: 16px;
    }
  `,
  PageNumbers: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 2px;
  `,
  Page: styled(motion.button)`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    font-size: 14px;
    font-weight: 400;
    border-radius: 50%;
    margin: 0 6px;
    cursor: pointer;
  `,
};
