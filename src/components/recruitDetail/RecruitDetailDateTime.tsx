import styled from 'styled-components';

interface RecruitDetailDateTimeProps {}

export default function RecruitDetailDateTime({}: RecruitDetailDateTimeProps) {
  return (
    <S.RecruitDetailDateTime>
      <span>등록일</span>
      <span>수정일</span>
    </S.RecruitDetailDateTime>
  );
}

const S = {
  RecruitDetailDateTime: styled.div`
    text-align: right;
  `,
};
