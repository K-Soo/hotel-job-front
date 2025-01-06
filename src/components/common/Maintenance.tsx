import styled from 'styled-components';

interface MaintenanceProps {}

export default function Maintenance({}: MaintenanceProps) {
  return (
    <S.Maintenance>
      <div className="container">
        <h1>서비스 준비중입니다.</h1>
      </div>
    </S.Maintenance>
  );
}

const S = {
  Maintenance: styled.section`
    height: calc(100vh - 230px);
    .container {
      padding-top: 200px;
      height: 100%;
      display: flex;
      justify-content: center;
      font-size: 34px;
    }
  `,
};
