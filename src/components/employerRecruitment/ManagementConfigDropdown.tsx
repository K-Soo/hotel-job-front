import React from 'react';
import styled from 'styled-components';
import Icon from '@/icons/Icon';
import { RecruitmentStatusKeys } from '@/types';
import { useRouter } from 'next/router';

interface ManagementConfigDropdownProps {
  id: string;
  status: RecruitmentStatusKeys;
  handleCloseRecruitment: (recruitmentId: string) => void;
  handleClickDeleteRecruitment: (ids: string[]) => Promise<void>;
  handleClickCopyRecruitment: (recruitmentId: string) => void;
}

const ManagementConfigDropdown = React.forwardRef<HTMLDivElement, ManagementConfigDropdownProps>(
  ({ id, handleCloseRecruitment, handleClickDeleteRecruitment, handleClickCopyRecruitment, status }, ref) => {
    const router = useRouter();

    return (
      <S.ManagementConfigDropdown
        ref={ref}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {(status === 'PUBLISHED' || status === 'PROGRESS') && (
          <S.MenuItem onClick={() => router.push(`/employer/recruitment/${id}`)}>
            <span className="text">공고 수정</span>
            <Icon name="Pen24x24" width="16px" height="16px" />
          </S.MenuItem>
        )}

        {(status === 'PUBLISHED' || status === 'PROGRESS' || status === 'CLOSED') && (
          <S.MenuItem onClick={() => handleClickCopyRecruitment(id)}>
            <span className="text">공고 복사</span>
            <Icon name="Copy24x24" width="16px" height="16px" />
          </S.MenuItem>
        )}

        {status === 'PROGRESS' && (
          <S.MenuItem onClick={() => handleCloseRecruitment(id)}>
            <span className="delete-text">공고 마감</span>
            <Icon name="Delete" width="16px" height="16px" />
          </S.MenuItem>
        )}

        {(status === 'PUBLISHED' || status === 'DRAFT' || status === 'REVIEWING') && (
          <S.MenuItem onClick={() => handleClickDeleteRecruitment([id])}>
            <span className="delete-text">공고 삭제</span>
            <Icon name="Delete" width="16px" height="16px" />
          </S.MenuItem>
        )}
      </S.ManagementConfigDropdown>
    );
  },
);

ManagementConfigDropdown.displayName = 'ManagementConfigDropdown';

export default ManagementConfigDropdown;

const S = {
  ManagementConfigDropdown: styled.article`
    position: absolute;
    top: 35px;
    right: 0;
    z-index: 10;
    width: 160px;
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
    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.theme.colors.gray};
    }
    &:last-child {
      border-bottom: none;
    }
    .delete-text {
      font-size: 13px;
      font-weight: 300;
      color: ${(props) => props.theme.colors.red400};
    }
    .text {
      font-size: 13px;
      font-weight: 300;
      color: ${(props) => props.theme.colors.black400};
    }
  `,
};
