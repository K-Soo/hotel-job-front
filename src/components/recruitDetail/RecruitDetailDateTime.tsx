import styled from 'styled-components';
import { dateFormat } from '@/utils';

interface RecruitDetailDateTimeProps {
  createdAt: string;
}

export default function RecruitDetailDateTime({ createdAt }: RecruitDetailDateTimeProps) {
  return (
    <S.RecruitDetailDateTime>
      <span className="create">{dateFormat.date(createdAt, 'YYYY.MM.DD')}</span>
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
    }
  `,
};
