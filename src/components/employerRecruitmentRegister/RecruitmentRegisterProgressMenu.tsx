import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import Link from 'next/link';
import Icon from '@/icons/Icon';
import React from 'react';

interface RecruitmentRegisterProgressMenuProps {}

function RecruitmentRegisterProgressMenu({}: RecruitmentRegisterProgressMenuProps) {
  return (
    <S.RecruitmentRegisterProgressMenu>
      <S.MenuForm>
        <div className="list-container">
          <Link className="list-container__item" href="#basic">
            <Icon name="CheckOn16x17" width="16px" height="17px" margin="0 5px 0 0" />
            <span>모집 내용</span>
          </Link>

          <Link className="list-container__item" href="#condition" scroll={true}>
            <Icon name="CheckOn16x17" width="16px" height="17px" margin="0 5px 0 0" />
            <span>근무조건</span>
          </Link>

          <Link className="list-container__item" href="#place" scroll={true}>
            <Icon name="CheckOn16x17" width="16px" height="17px" margin="0 5px 0 0" />
            <span>근무지 정보</span>
          </Link>

          <Link className="list-container__item" href="#manager" scroll={true}>
            <Icon name="CheckOn16x17" width="16px" height="17px" margin="0 5px 0 0" />
            <span>담당자 정보</span>
          </Link>
        </div>
      </S.MenuForm>

      <Button label="공고 등록 하기" variant="primary" margin="0 0 10px 0" />

      <Button label="미리보기" variant="tertiary" margin="0 0 10px 0" />

      <Button label="임시저장" variant="tertiary" />
    </S.RecruitmentRegisterProgressMenu>
  );
}

export default React.memo(RecruitmentRegisterProgressMenu);

const S = {
  RecruitmentRegisterProgressMenu: styled.aside`
    position: sticky;
    top: 90px;
    width: 250px;
    margin-left: 30px;
    max-height: fit-content;
    ${(props) => props.theme.media.tablet`
      display: none;
    `};
  `,
  MenuForm: styled.div`
    border: 1px solid ${(props) => props.theme.colors.gray200};
    border-radius: 5px;
    padding: 0 15px;
    margin-bottom: 15px;
    svg {
      fill: red;
    }
    .list-container {
      display: flex;
      flex-direction: column;
      &__item {
        font-size: 15px;
        height: 40px;
        display: flex;
        align-items: center;
        /* justify-content: space-between; */
        color: ${(props) => props.theme.colors.gray600};
      }
    }
  `,
};
