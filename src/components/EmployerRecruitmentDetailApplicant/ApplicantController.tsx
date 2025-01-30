import styled from 'styled-components';

interface ApplicantControllerProps {}

export default function ApplicantController({}: ApplicantControllerProps) {
  return (
    <S.ApplicantController>
      <div className="left">
        <p>전형 변경은 지원자에게 공개되지않습니다.</p>
      </div>
      <div className="right"></div>
    </S.ApplicantController>
  );
}

const S = {
  ApplicantController: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .left {
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray700};
    }
  `,
};
