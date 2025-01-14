import styled, { css } from 'styled-components';
import CheckBox from '@/components/common/style/CheckBox';
import Button from '@/components/common/style/Button';

interface ApplicantTableProps {
  children: React.ReactNode;
}

export default function ApplicantTable({ children }: ApplicantTableProps) {
  return <StyledTable>{children}</StyledTable>;
}

const CommonFlex = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledTable = styled.div`
  box-sizing: border-box;
`;

function ApplicantTableHeader() {
  return (
    <StyledTableHeader>
      <span className="header-row check">
        <CheckBox className="row-check" checked={false} name={'ch'} onChange={() => {}} />
      </span>
      <span className="header-row status">전형/합격 여부</span>
      <span className="header-row name">이름/나이</span>
      <span className="header-row career">경력</span>
      <span className="header-row education">최종 학력</span>
      <span className="header-row salary">희망/최근급여</span>
      <span className="header-row date">지원일</span>
      <span className="header-row step">전형</span>
      <span className="header-row remark">메모</span>
      <span className="header-row class">분류</span>
    </StyledTableHeader>
  );
}

const StyledTableHeader = styled.div`
  /* box-sizing: border-box; */
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border-bottom: 1px solid ${(props) => props.theme.colors.gray300}; */
  background-color: ${(props) => props.theme.colors.gray};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
  .header-row {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    font-size: 14px;
    color: ${(props) => props.theme.colors.gray900};
  }
  .check {
    flex: 0 1 50px;
    display: flex;
    align-items: center;
    /* border: 1px solid red; */
    .row-check {
      label {
        padding-left: 25px;
      }
    }
  }
  .status {
    ${CommonFlex}
    flex-basis: 10%;
    height: 100%;
    /* border: 1px solid red; */
  }
  .name {
    ${CommonFlex}
    flex-grow: 1;
    height: 100%;
    /* border: 1px solid red; */
  }
  .career {
    ${CommonFlex}
    flex-basis: 8%;
    height: 100%;
    /* border: 1px solid red; */
  }
  .education {
    ${CommonFlex}
    flex-basis: 10%;
    height: 100%;
    /* border: 1px solid red; */
  }
  .salary {
    ${CommonFlex}
    flex-basis: 140px;
    height: 100%;
    /* border: 1px solid red; */
  }
  .date {
    ${CommonFlex}
    flex-basis: 10%;
    height: 100%;
    /* border: 1px solid red; */
  }
  .class {
    ${CommonFlex}
    flex-basis: 70px;
    height: 100%;
    /* border: 1px solid red; */
  }
  .step {
    ${CommonFlex}
    flex-basis: 15%;
    height: 100%;
    /* border: 1px solid red; */
  }
  .remark {
    ${CommonFlex}
    flex: 0 1 100px;
    height: 100%;
    /* border: 1px solid red; */
  }
`;

const RESPONSE = [
  {
    id: 1,
    name: '홍길동',
    age: 30,
    career: 5,
    education: '대졸',
    salary: '5000/4000',
    date: '2021-09-01',
    step: '서류전형',
    status: '최종합격',
  },
  {
    id: 1,
    name: '홍길동',
    age: 30,
    career: 5,
    education: '대졸',
    salary: '5000/4000',
    date: '2021-09-01',
    step: '서류전형',
    status: '서류전형',
  },
  {
    id: 1,
    name: '홍길동',
    age: 30,
    career: 5,
    education: '대졸',
    salary: '5000/4000',
    date: '2021-09-01',
    step: '서류전형',
    status: '면접',
  },
  {
    id: 1,
    name: '홍길동',
    age: 30,
    career: 5,
    education: '대졸',
    salary: '5000/4000',
    date: '2021-09-01',
    step: '서류전형',
    status: '불합격',
  },
];
function ApplicantTableBody() {
  return (
    <StyledTableBody>
      {RESPONSE.map((el) => (
        <div key={el.age} className="body-row">
          <div className="check">
            <CheckBox className="row-check" checked={false} name={'ch'} onChange={() => {}} />
          </div>
          <div className="status">
            <span>{el.status}</span>
          </div>

          <div className="name">이름/나이</div>
          <div className="career">경력</div>
          <div className="education">대학교 4학년</div>
          <div className="salary">3000 ~ 3800</div>
          <div className="date">2025.01.15</div>

          <div className="step">
            {el.status === '서류전형' && (
              <>
                <Button label="다음 전형 이동" variant="primary" width="110px" fontSize="13px" height="30px" />
              </>
            )}

            {el.status === '면접' && (
              <>
                <Button label="면접 제안" variant="primary" width="110px" fontSize="13px" height="30px" />
                <span>전형이동 복구</span>
              </>
            )}

            {el.status === '최종합격' && (
              <>
                <Button label="합격 통보" variant="primary" width="110px" fontSize="13px" height="30px" />
                <span>전형이동 복구</span>
              </>
            )}

            {el.status === '불합격' && (
              <>
                <Button label="불합격 통보" variant="primary" width="110px" fontSize="13px" height="30px" />
                <span>전형이동 복구</span>
              </>
            )}
          </div>
          <div className="remark">메모</div>
          <div className="class">
            <span>열람</span>
          </div>
        </div>
      ))}
    </StyledTableBody>
  );
}

const StyledTableBody = styled.div`
  min-height: 400px;
  .body-row {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100px;
    font-size: 14px;
    /* border: 1px solid red; */
    border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
    .check {
      ${CommonFlex}
      flex: 0 1 50px;
      height: 100%;
      /* border: 1px solid red; */
      .row-check {
        /* border: 1px solid red; */
        label {
          padding-left: 25px;
        }
      }
    }
    .status {
      ${CommonFlex}
      flex-basis: 10%;
      height: 100%;
      /* border: 1px solid red; */
    }
    .name {
      ${CommonFlex}
      flex-grow: 1;
      height: 100%;
      /* border: 1px solid red; */
    }
    .career {
      ${CommonFlex}
      flex-basis: 8%;
      height: 100%;
      /* border: 1px solid red; */
    }
    .education {
      ${CommonFlex}
      flex-basis: 10%;
      height: 100%;
      /* border: 1px solid red; */
    }
    .salary {
      ${CommonFlex}
      flex-basis: 140px;
      height: 100%;
      /* border: 1px solid red; */
    }
    .date {
      ${CommonFlex}
      flex-basis: 10%;
      height: 100%;
      /* border: 1px solid red; */
    }
    .class {
      ${CommonFlex}
      flex-basis: 70px;
      height: 100%;
      /* border: 1px solid red; */
    }
    .step {
      ${CommonFlex}
      flex-basis: 15%;
      height: 100%;
      /* border: 1px solid red; */
    }
    .remark {
      ${CommonFlex}
      flex: 0 1 100px;
      height: 100%;
      /* border: 1px solid red; */
    }
  }
`;

ApplicantTable.Header = ApplicantTableHeader;
ApplicantTable.Body = ApplicantTableBody;
