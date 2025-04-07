import styled from 'styled-components';

interface RecruitDetailDateTimeProps {}

export default function RecruitDetailDateTime({}: RecruitDetailDateTimeProps) {
  return (
    <S.RecruitDetailDateTime>
      <span className="create">24.12.12</span>
      <span className="update">2024.12.12</span>
    </S.RecruitDetailDateTime>
  );
}

const S = {
  RecruitDetailDateTime: styled.div`
    font-size: 13px;
    color: ${(props) => props.theme.colors.black800};
    ${(props) => props.theme.media.tablet`
      display: none;
    `};
    .create {
      &::before {
        content: '등록일';
        padding-right: 4px;
        font-weight: 300;
        color: ${(props) => props.theme.colors.gray500};
      }
      &::after {
        content: '';
        display: inline-block;
        width: 1px;
        height: 10px;
        background-color: ${({ theme }) => theme.colors.gray400};
        margin: 0 8px;
      }
    }
    .update {
      &::before {
        content: '수정일';
        padding-right: 4px;
        font-weight: 300;
        color: ${(props) => props.theme.colors.gray500};
      }
    }
  `,
};
