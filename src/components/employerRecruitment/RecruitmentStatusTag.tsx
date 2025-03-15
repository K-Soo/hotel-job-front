import { RecruitmentStatusKeys } from '@/types';
import styled, { css } from 'styled-components';
import { RECRUITMENT_STATUS } from '@/constants/recruitment';

interface RecruitmentStatusTagProps {
  status: RecruitmentStatusKeys;
}

export default function RecruitmentStatusTag({ status }: RecruitmentStatusTagProps) {
  return <S.RecruitmentStatusTag type={status}>{RECRUITMENT_STATUS[status]}</S.RecruitmentStatusTag>;
}

const S = {
  RecruitmentStatusTag: styled.span<{ type: RecruitmentStatusKeys }>`
    user-select: none;
    cursor: default;
    display: inline-block;
    font-size: 13px;
    width: 65px;
    max-width: 90px;
    color: #343a40;
    border-radius: 30px;
    padding: 5px 5px;
    font-weight: 400;
    ${(props) =>
      props.type === 'PROGRESS' &&
      css`
        color: #4caf50;
        background-color: rgba(76, 175, 80, 0.15);
      `};
    ${(props) =>
      props.type === 'PUBLISHED' &&
      css`
        color: ${props.theme.colors.blue500};
        background-color: ${props.theme.colors.blue50};
      `};
    ${(props) =>
      props.type === 'CLOSED' &&
      css`
        color: ${props.theme.colors.gray600};
        background-color: ${props.theme.colors.gray100};
      `};
    ${(props) =>
      props.type === 'REVIEWING' &&
      css`
        color: #6f42c1;
      `};
    ${(props) =>
      props.type === 'DRAFT' &&
      css`
        color: ${props.theme.colors.red300};
        background-color: ${props.theme.colors.red100};
      `};
  `,
};
