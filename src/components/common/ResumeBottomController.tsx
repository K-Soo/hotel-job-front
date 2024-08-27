import styled from "styled-components";

interface ResumeBottomControllerProps {}

export default function ResumeBottomController({}: ResumeBottomControllerProps) {
  return (
    <S.ResumeBottomController>
      <div className="container">
        <input type="text" />
        <button>미리보기</button>
        <button>작성완료</button>
      </div>
    </S.ResumeBottomController>
  );
}

const S = {
  ResumeBottomController: styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    height: 50px;
    background-color: gold;
    .container {
      max-width: 1080px;
      margin: 0 auto;
      border: 1px solid red;
      height: 100%;
    }
  `,
};
