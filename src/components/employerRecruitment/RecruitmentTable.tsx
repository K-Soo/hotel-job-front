import styled from 'styled-components';
import CheckBox from '@/components/common/style/CheckBox';
import { RecruitmentItem, RecruitmentStatusKeys } from '@/types';
import RecruitmentStatusTag from '@/components/employerRecruitment/RecruitmentStatusTag';
import ApplicantStatusOverview from '@/components/employerRecruitment/ApplicantStatusOverview';
import ProductOverview from '@/components/employerRecruitment/ProductOverview';
import RecruitmentOverview from '@/components/employerRecruitment/RecruitmentOverview';
import ManagementOverview from '@/components/employerRecruitment/ManagementOverview';
interface RecruitmentTableProps {
  children: React.ReactNode;
}

interface RecruitmentTableBodyProps {
  items: RecruitmentItem[];
  checkedItems: string[];
  handleClickRecruitmentItem: (id: string, status: RecruitmentStatusKeys) => void;
  handleClickCheckBoxItem: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseRecruitment: (recruitmentId: string) => Promise<void>;
  handleClickDeleteRecruitment: (ids: string[]) => Promise<void>;
  handleClickCopyRecruitment: (recruitmentId: string) => void;
}

export default function RecruitmentTable({ children }: RecruitmentTableProps) {
  return <S.RecruitmentTable>{children}</S.RecruitmentTable>;
}

function RecruitmentTableHeader() {
  return (
    <S.RecruitmentTableHeader>
      <span className="header-row check"></span>
      <span className="header-row status">상태</span>
      <span className="header-row text">공고</span>
      <span className="header-row product">상품/마감일</span>
      <span className="header-row candidate">지원자</span>
      <span className="header-row management"></span>
    </S.RecruitmentTableHeader>
  );
}

function RecruitmentTableBody({
  items,
  handleClickRecruitmentItem,
  checkedItems,
  handleClickCheckBoxItem,
  handleCloseRecruitment,
  handleClickDeleteRecruitment,
  handleClickCopyRecruitment,
}: RecruitmentTableBodyProps) {
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

          <div className="item__text" onClick={() => handleClickRecruitmentItem(item.id, item.recruitmentStatus)}>
            <RecruitmentOverview item={item} />
          </div>

          <div className="item__product">
            <ProductOverview item={item} />
          </div>

          <div className="item__candidate" onClick={() => handleClickRecruitmentItem(item.id, item.recruitmentStatus)}>
            <ApplicantStatusOverview status={item.recruitmentStatus} applicationCount={item.applicationCount} />
          </div>

          <div className="item__management">
            <ManagementOverview
              status={item.recruitmentStatus}
              id={item.id}
              handleCloseRecruitment={handleCloseRecruitment}
              handleClickDeleteRecruitment={handleClickDeleteRecruitment}
              handleClickCopyRecruitment={handleClickCopyRecruitment}
            />
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
  `,
  RecruitmentTableHeader: styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
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
      margin: 0 15px;
    }
    .product {
      flex-basis: 220px;
    }
    .candidate {
      flex-basis: 220px;
    }
    .management {
      flex-basis: 100px;
    }
  `,
  RecruitmentTableBody: styled.div`
    min-height: 360px;
    .item {
      height: 60px;
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
        margin: 0 15px;
      }
      &__product {
        flex-basis: 220px;
      }
      &__candidate {
        flex-basis: 220px;
      }
      &__management {
        flex-basis: 100px;
      }
    }
  `,
};

RecruitmentTable.Header = RecruitmentTableHeader;
RecruitmentTable.Body = RecruitmentTableBody;
