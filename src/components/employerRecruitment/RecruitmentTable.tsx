import styled from 'styled-components';
import CheckBox from '@/components/common/style/CheckBox';
import { RecruitmentItem } from '@/types';
import RecruitmentStatusTag from '@/components/employerRecruitment/RecruitmentStatusTag';
interface RecruitmentTableProps {
  children: React.ReactNode;
}

interface RecruitmentTableBodyProps {
  items: RecruitmentItem[];
  checkedItems: string[];
  handleClickRecruitmentItem: (value: string) => void;
  handleClickCheckBoxItem: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RecruitmentTable({ children }: RecruitmentTableProps) {
  return <S.RecruitmentTable>{children}</S.RecruitmentTable>;
}

function RecruitmentTableHeader() {
  return (
    <S.RecruitmentTableHeader>
      <span className="header-row check"></span>
      <span className="header-row status">상태</span>
      <span className="header-row text">공고제목</span>
      <span className="header-row candidate">지원자</span>
      <span className="header-row date">생성/수정일</span>
    </S.RecruitmentTableHeader>
  );
}

function RecruitmentTableBody({ items, handleClickRecruitmentItem, checkedItems, handleClickCheckBoxItem }: RecruitmentTableBodyProps) {
  return (
    <S.RecruitmentTableBody>
      {items.map((item) => (
        <div className="item" key={item.id}>
          <div className="item__check">
            <CheckBox
              checked={checkedItems.includes(item.id)}
              name={item.id}
              onChange={handleClickCheckBoxItem}
              onClick={(event) => {
                event.stopPropagation();
              }}
            />
          </div>

          <div className="item__status">
            <RecruitmentStatusTag status={item.recruitmentStatus} />
          </div>

          <div className="item__text" onClick={() => handleClickRecruitmentItem(item.id)}>
            {item.recruitmentTitle}
          </div>

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
      flex-basis: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .status {
      flex-basis: 100px;
    }
    .text {
      flex-grow: 1;
    }
    .candidate {
      flex-basis: 300px;
    }
    .date {
      flex-basis: 150px;
    }
  `,
  RecruitmentTableBody: styled.div`
    max-height: 400px;
    background-color: ${(props) => props.theme.colors.blue};
    .item {
      height: 50px;
      display: flex;
      align-items: center;
      text-align: center;
      border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
      background-color: ${(props) => props.theme.colors.white};
      font-size: 14px;
      &:hover {
        background-color: ${(props) => props.theme.colors.blue};
      }
      &__check {
        flex-basis: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &__status {
        flex-basis: 100px;
      }
      &__text {
        flex-grow: 1;
        text-align: center;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      &__candidate {
        flex-basis: 300px;
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
