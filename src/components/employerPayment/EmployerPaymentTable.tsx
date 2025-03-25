import styled from 'styled-components';
import { EmployerPaymentItem } from '@/types';
import { dateFormat, priceComma } from '@/utils';
import { PAYMENT_STATUS } from '@/constants/payment';

interface RecruitmentTableProps {
  children: React.ReactNode;
}

interface EmployerPaymentTableBodyProps {
  data: EmployerPaymentItem[];
  handleClickPaymentItem: (payment: EmployerPaymentItem) => void;
}

export default function EmployerPaymentTable({ children }: RecruitmentTableProps) {
  return <S.EmployerPaymentTable>{children}</S.EmployerPaymentTable>;
}

function EmployerPaymentTableHeader() {
  return (
    <S.RecruitmentTableHeader>
      <span className="header-row">주문번호</span>
      <span className="header-row">결제상품</span>
      <span className="header-row">주문상태</span>
      <span className="header-row">결제금액</span>
      <span className="header-row">주문요청일</span>
    </S.RecruitmentTableHeader>
  );
}

function EmployerPaymentTableBody({ data, handleClickPaymentItem }: EmployerPaymentTableBodyProps) {
  return (
    <S.RecruitmentTableBody>
      {data.map((item) => {
        if (!item) return;

        const isCoupon = item.paymentMethod === '쿠폰';

        return (
          <div key={item.id} className="body-row" onClick={() => handleClickPaymentItem(item)}>
            <div className="body-row__item">{item.orderId}</div>
            <div className="body-row__item">{isCoupon ? '무료쿠폰' : item.transactions[0].orderName}</div>
            <div className="body-row__item">{PAYMENT_STATUS[item.paymentStatus]}</div>
            <div className="body-row__item">{priceComma(item.totalAmount)}원</div>
            <div className="body-row__item">{dateFormat.date(item.createdAt, 'YY.MM.DD HH:mm')}</div>
          </div>
        );
      })}
    </S.RecruitmentTableBody>
  );
}

const S = {
  EmployerPaymentTable: styled.div`
    width: 100%;
    border-top: 1px solid ${(props) => props.theme.colors.gray700};
    border-bottom: 1px solid ${(props) => props.theme.colors.gray700};
    height: auto;
  `,
  RecruitmentTableHeader: styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    white-space: nowrap;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
    background-color: ${(props) => props.theme.colors.blue};
    .header-row {
      text-align: center;
      font-size: 14px;
      color: ${(props) => props.theme.colors.gray900};
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
    }
  `,
  RecruitmentTableBody: styled.div`
    .body-row {
      height: 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
      &:hover {
        background-color: ${(props) => props.theme.colors.blue};
      }
      &__item {
        flex: 1;
        font-size: 13px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        white-space: nowrap;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
    :last-child {
      border-bottom: none;
    }
  `,
};

EmployerPaymentTable.Header = EmployerPaymentTableHeader;
EmployerPaymentTable.Body = EmployerPaymentTableBody;
