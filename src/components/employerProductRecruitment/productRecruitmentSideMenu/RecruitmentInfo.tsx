import React from 'react';
import { GetPublishedRecruitmentListItem } from '@/types';
import styled, { css } from 'styled-components';
import Icon from '@/icons/Icon';
import { motion } from 'framer-motion';
import { ALL_JOBS } from '@/constants/job';
import { selectRecruitmentIdAtom } from '@/recoil/product';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import path from '@/constants/path';

interface RecruitmentInfoProps {
  items: GetPublishedRecruitmentListItem[];
}

export default function RecruitmentInfo({ items }: RecruitmentInfoProps) {
  const [selectedRecruitment, setSelectedRecruitment] = React.useState<GetPublishedRecruitmentListItem | null>(null);
  const [isOpenDropDown, setIsOpenDropDown] = React.useState(false);
  const [isFocus, setIsFocus] = React.useState(false);
  const setSelectRecruitmentIdAtom = useSetRecoilState(selectRecruitmentIdAtom);
  const router = useRouter();

  const selectRef = React.useRef<HTMLDivElement | null>(null); // ✅ 셀렉트 박스 참조
  const dropDownRef = React.useRef<HTMLDivElement | null>(null); // ✅ 드롭다운 참조

  const isEmptyRecruitment = items.length === 0;

  const handleClickSelect = () => {
    setIsOpenDropDown((prev) => !prev);
    setIsFocus(true);
  };

  const handleClickDropDownItem = (item: GetPublishedRecruitmentListItem) => {
    if (selectedRecruitment?.id === item.id) {
      setIsOpenDropDown(false);
      setIsFocus(false);
      return;
    }

    setSelectRecruitmentIdAtom({ recruitmentId: item.id });
    setSelectedRecruitment(item);
    setIsOpenDropDown(false);
    setIsFocus(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node) &&
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setIsOpenDropDown(false);
        setIsFocus(false);
      }
    };

    if (isOpenDropDown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenDropDown]);

  if (isEmptyRecruitment) {
    return (
      <S.RecruitmentInfo>
        <StyledEmptyForm>
          <span className="text">광고를 적용할 수 있는 공고가 없습니다.</span>
          <button className="now" onClick={() => router.push(path.EMPLOYER_RECRUITMENT)}>
            공고 등록하러 가기
          </button>
        </StyledEmptyForm>
      </S.RecruitmentInfo>
    );
  }

  return (
    <S.RecruitmentInfo>
      <S.RecruitmentSelect
        ref={selectRef}
        onClick={() => handleClickSelect()}
        whileHover={!isFocus ? { boxShadow: 'inset 0 0 0 1px #90c2ff', border: '1px solid #90c2ff' } : {}}
        tabIndex={0}
        $active={isFocus}
      >
        {selectedRecruitment && <span>{selectedRecruitment.recruitmentTitle}</span>}
        {!selectedRecruitment && !isEmptyRecruitment && <span>선택</span>}
        <i className="arrow-icon">
          <Icon name="ArrowLeft24x24" width="20px" height="20px" />
        </i>
      </S.RecruitmentSelect>

      {isOpenDropDown && (
        <S.DropDownMenu ref={dropDownRef}>
          {items.map((item) => (
            <S.DropDownMenuItem
              key={item.id}
              initial={{ backgroundColor: 'white' }}
              whileHover={{ backgroundColor: '#f2f4f6' }}
              onClick={() => handleClickDropDownItem(item)}
              $active={selectedRecruitment?.id === item.id}
              tabIndex={0}
            >
              <span>{item.recruitmentTitle}</span>
              <div className="job-box">
                {item.jobs.map((job) => (
                  <span className="job-box__text" key={job}>
                    {ALL_JOBS[job]}
                  </span>
                ))}
              </div>
            </S.DropDownMenuItem>
          ))}
        </S.DropDownMenu>
      )}
    </S.RecruitmentInfo>
  );
}

const StyledEmptyForm = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  .text {
    color: ${(props) => props.theme.colors.red500};
  }
  .now {
    margin-top: 15px;
    color: ${(props) => props.theme.colors.blue400};
    font-weight: 500;
    cursor: pointer;
    text-decoration: underline;
    font-size: 13px;
    &:hover {
      color: ${(props) => props.theme.colors.blue600};
    }
  }
`;

const S = {
  RecruitmentInfo: styled.div`
    padding: 10px 0;
    position: relative;
  `,

  RecruitmentSelect: styled(motion.div)<{ $active: boolean }>`
    height: 45px;
    border: 1px solid ${(props) => props.theme.colors.gray300};
    border-radius: 5px;
    width: 100%;
    position: relative;
    align-items: center;
    cursor: pointer;
    padding: 0 15px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    ${(props) =>
      props.$active &&
      css`
        border: 1px solid ${props.theme.colors.blue500} !important;
        box-shadow: inset 0 0 0 1px #3182f6 !important;
      `};
    .arrow-icon {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        transform: rotate(270deg);
        color: #d1d6db;
      }
    }
    select {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }
  `,
  DropDownMenu: styled.div`
    position: absolute;
    left: 0;
    right: 0;
    background-color: white;
    width: 100%;
    z-index: 1;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    max-height: 230px;
  `,
  DropDownMenuItem: styled(motion.div)<{ $active: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 45px;
    cursor: pointer;
    margin: 10px;
    border-radius: 8px;
    padding-left: 10px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.black600};
    ${(props) =>
      props.$active &&
      css`
        color: ${props.theme.colors.blue500};
      `};
    .job-box {
      margin-top: 4px;
      display: flex;
      &__text {
        padding-right: 5px;
        font-size: 13px;
      }
    }
  `,
};
