import styled from "styled-components";

interface RecruitDetailProps {}

export default function RecruitDetail({}: RecruitDetailProps) {
  return (
    <S.RecruitDetail>
      <S.Header>
        <div>
          <div>메이호텔</div>
          <div>야간 근무할 담당자 모십니다.</div>
        </div>
        <div>
          <span>즐겨찾기</span>
          <button>입사지원</button>
        </div>
      </S.Header>
      <S.Content>
        <p>lasdlpsalpdlspaldp</p>
      </S.Content>
      <S.Location>{/* 근무위치 */}</S.Location>
      <S.Accept>
        {/* 접수 기간 및 담당자 */}
        <div className="period">
          <div></div>
          <div></div>
        </div>
        <div className="info">
          <div>
            <span>지원방법</span>
            <span>입사지원 / 전화</span>
          </div>
          <div>
            <span>담당자</span>
            <span>이건호</span>
          </div>
          <div>
            <span>연락처</span>
            <span>010-1234-1231</span>
          </div>
          <div>
            <span>메일</span>
            <span>kanabun12asd@naver.com</span>
          </div>
        </div>
      </S.Accept>
    </S.RecruitDetail>
  );
}

const S = {
  RecruitDetail: styled.div``,
  Header: styled.div``,
  Content: styled.div``,
  Location: styled.div``,
  Accept: styled.div`
    ${(props) => props.theme.tablet``};
  `,
};
