import React from 'react';
import styled from 'styled-components';

function RecruitmentPolicy() {
  return (
    <RecruitmentPolicyContainer>
      <h5 className="policy-title">공고 등록 확인</h5>
      <p className="policy-text">최저임금을 준수하지 않는 경우, 공고 강제 마감 및 행정처분을 받을 수 있습니다.</p>
      <p className="policy-text">채용절차 공정화 법상 금지되는 개인 정보를 요구하는 경우, 공고 강제 마감 및 행정처분을 받을 수 있습니다.</p>
    </RecruitmentPolicyContainer>
  );
}

export default React.memo(RecruitmentPolicy);

const RecruitmentPolicyContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.blue50};
  border-radius: 5px;
  .policy-title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
    color: ${(props) => props.theme.colors.gray800};
  }
  .policy-text {
    font-size: 14px;
    line-height: 1.4;
    color: ${(props) => props.theme.colors.gray700};
    &::before {
      content: '•';
      padding-right: 5px;
    }
  }
`;
