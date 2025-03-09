import React from 'react';
import styled from 'styled-components';
import Icon from '@/icons/Icon';
import { ResumeListItem } from '@/types';

interface ResumeConfigDropDownProps {
  item: ResumeListItem;
  handleClickRemoveResume: (resume: ResumeListItem) => void;
}

const ResumeConfigDropDown = React.forwardRef<HTMLDivElement, ResumeConfigDropDownProps>(({ item, handleClickRemoveResume }, ref) => {
  return (
    <S.ResumeConfigDropDown
      ref={ref}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      {/* <S.MenuItem>
        <span className="text">이력서 이름 변경</span>
        <Icon name="Delete" width="16px" height="16px" />
      </S.MenuItem> */}

      {!item.isDefault && (
        <S.MenuItem onClick={() => handleClickRemoveResume(item)}>
          <span className="delete-text">이력서 삭제</span>
          <Icon name="Delete" width="16px" height="16px" />
        </S.MenuItem>
      )}
    </S.ResumeConfigDropDown>
  );
});

ResumeConfigDropDown.displayName = 'ResumeConfigDropDown';

export default ResumeConfigDropDown;

const S = {
  ResumeConfigDropDown: styled.article`
    position: absolute;
    top: 35px;
    right: 0;
    z-index: 10;
    width: 200px;
    height: auto;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #eaebec;
    overflow: hidden;
  `,
  MenuItem: styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
    &:hover {
      background-color: ${(props) => props.theme.colors.gray};
    }
    &:last-child {
      border-bottom: none;
    }
    .delete-text {
      font-size: 12px;
      font-weight: 300;
      color: ${(props) => props.theme.colors.red400};
    }
    .text {
      font-size: 12px;
      font-weight: 300;
      color: ${(props) => props.theme.colors.black400};
    }
  `,
};
