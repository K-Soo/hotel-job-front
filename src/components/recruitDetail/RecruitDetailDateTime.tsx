import styled from 'styled-components';

interface RecruitDetailDateTimeProps {}

export default function RecruitDetailDateTime({}: RecruitDetailDateTimeProps) {
  return (
    <S.RecruitDetailDateTime>
      <span>등록 24.12.12</span>
      {/* <span>수정일</span> */}
    </S.RecruitDetailDateTime>
  );
}

const S = {
  RecruitDetailDateTime: styled.div`
    text-align: right;
    font-size: 12px;
    color: ${(props) => props.theme.colors.black600};
  `,
};
