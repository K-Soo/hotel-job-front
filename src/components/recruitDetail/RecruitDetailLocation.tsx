import styled from 'styled-components';

interface RecruitDetailLocationProps {}

export default function RecruitDetailLocation({}: RecruitDetailLocationProps) {
  return (
    <S.RecruitDetailLocation>
      <div>서울 송파구 올림픽로 602-5</div>
      <div>지도</div>
    </S.RecruitDetailLocation>
  );
}

const S = {
  RecruitDetailLocation: styled.div``,
};
