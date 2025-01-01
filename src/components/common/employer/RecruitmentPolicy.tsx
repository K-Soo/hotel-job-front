import styled from 'styled-components';

interface RecruitmentPolicyProps {}

export default function RecruitmentPolicy({}: RecruitmentPolicyProps) {
  return (
    <S.RecruitmentPolicy>
      <h5 className="policy-title">공고 등록 확인</h5>
      <p className="policy-text">최저임금을 준수하지 않는 경우, 공고 강제 마감 및 행정처분을 받을 수 있습니다.</p>
      <p className="policy-text">채용절차 공정화 법상 금지되는 개인 정보를 요구하는 경우, 공고 강제 마감 및 행정처분을 받을 수 있습니다.</p>
      <p className="policy-text">최저임금을 준수하지 않는 경우, 공고 강제 마감 및 행정처분을 받을 수 있습니다.</p>
      <p className="policy-text">최저임금을 준수하지 않는 경우, 공고 강제 마감 및 행정처분을 받을 수 있습니다.</p>
    </S.RecruitmentPolicy>
  );
}

const S = {
  RecruitmentPolicy: styled.div`
    width: 100%;
    padding: 20px;
    background-color: ${(props) => props.theme.colors.blue50};
    border-radius: 5px;
    .policy-title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 10px;
    }
    .policy-text {
      font-size: 14px;
      line-height: 1.3;
      color: ${(props) => props.theme.colors.gray600};
      &::before {
        content: '•';
        padding-right: 5px;
      }
    }
  `,
};
