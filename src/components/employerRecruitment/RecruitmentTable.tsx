import styled from 'styled-components';
import CheckBox from '@/components/common/style/CheckBox';

interface RecruitmentTableProps {
  children: React.ReactNode;
}

interface RecruitmentTableBodyProps {
  handleClickRecruitmentItem: (value: number) => void;
}

export default function RecruitmentTable({ children }: RecruitmentTableProps) {
  return <S.RecruitmentTable>{children}</S.RecruitmentTable>;
}

function RecruitmentTableHeader() {
  return (
    <S.RecruitmentTableHeader>
      <span className="header-row check">
        <CheckBox checked={false} name="" onChange={() => {}} />
      </span>
      <span className="header-row status">상태</span>
      <span className="header-row text">공고제목</span>
      <span className="header-row candidate">지원자</span>
      <span className="header-row date">생성/수정일</span>
    </S.RecruitmentTableHeader>
  );
}

const RESPONSE_DATA = [
  { name: 'asd', status: 'asd', text: 'asd', candidate: 'asd', date: 'asd' },
  { name: 'asd', status: 'asd', text: 'asd', candidate: 'asd', date: 'asd' },
  { name: 'asd', status: 'asd', text: 'asd', candidate: 'asd', date: 'asd' },
  { name: 'asd', status: 'asd', text: 'asd', candidate: 'asd', date: 'asd' },
  { name: 'asd', status: 'asd', text: 'asd', candidate: 'asd', date: 'asd' },
  { name: 'asd', status: 'asd', text: 'asd', candidate: 'asd', date: 'asd' },
  { name: 'asd', status: 'asd', text: 'asd', candidate: 'asd', date: 'asd' },
  { name: 'asd', status: 'asd', text: 'asd', candidate: 'asd', date: 'asd' },
  { name: 'asd', status: 'asd', text: 'asd', candidate: 'asd', date: 'asd' },
  { name: 'asd', status: 'asd', text: 'asd', candidate: 'asd', date: 'asd' },
];

function RecruitmentTableBody({ handleClickRecruitmentItem }: RecruitmentTableBodyProps) {
  return (
    <S.RecruitmentTableBody>
      {RESPONSE_DATA.map((data, index) => (
        <div className="item" key={index} onClick={() => handleClickRecruitmentItem(index)}>
          <div className="item__check">
            <CheckBox checked={false} name="" onChange={() => {}} />
          </div>

          <div className="item__status">
            <span className="item__status--progress">진행중</span>
          </div>

          <div className="item__text">당번 구인합니다.</div>

          <div className="item__candidate">
            <div>
              <span>지원자 100</span>
              <span>열람 10</span>
              <span>미열람 10</span>
            </div>
          </div>

          <div className="item__date">
            <p>2021.09.01</p>
            <p>2021.09.03</p>
          </div>
        </div>
      ))}
    </S.RecruitmentTableBody>
  );
}

const S = {
  RecruitmentTable: styled.div`
    width: 100%;
    border-top: 1px solid ${(props) => props.theme.colors.gray700};
    border-bottom: 1px solid ${(props) => props.theme.colors.gray700};
  `,
  RecruitmentTableHeader: styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
    .header-row {
      text-align: center;
      font-size: 14px;
      color: ${(props) => props.theme.colors.gray900};
    }
    .check {
      flex-basis: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .status {
      flex-basis: 100px;
    }
    .text {
      flex-grow: 1;
      border: 1px solid red;
    }
    .candidate {
      flex-basis: 300px;
      border: 1px solid red;
    }
    .date {
      flex-basis: 150px;
    }
  `,
  RecruitmentTableBody: styled.div`
    min-height: 300px;
    background-color: ${(props) => props.theme.colors.blue};
    .item {
      height: 50px;
      display: flex;
      align-items: center;
      text-align: center;
      border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
      background-color: ${(props) => props.theme.colors.white};
      font-size: 14px;
      cursor: pointer;
      &:hover {
        background-color: ${(props) => props.theme.colors.blue};
      }
      &__check {
        flex-basis: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &__status {
        flex-basis: 100px;
        &--progress {
          padding: 3px 8px;
          font-size: 12px;
          color: #13ce66;
          font-weight: 500;
        }
      }
      &__text {
        flex-grow: 1;
      }
      &__candidate {
        flex-basis: 300px;
        /* border: 1px solid red; */
      }
      &__date {
        flex-basis: 150px;
        font-size: 12px;
        color: ${(props) => props.theme.colors.gray600};
      }
    }
  `,
};

RecruitmentTable.Header = RecruitmentTableHeader;
RecruitmentTable.Body = RecruitmentTableBody;
