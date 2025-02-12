import React from 'react';
import { EmployerPaymentItem } from '@/types';
import styled from 'styled-components';
import { dateFormat, priceComma } from '@/utils';
import { PAYMENT_TYPE } from '@/constants/payment';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import path from '@/constants/path';

interface PaymentDetailFormProps {
  selectedPayment: EmployerPaymentItem;
}

export default function PaymentDetailForm({ selectedPayment }: PaymentDetailFormProps) {
  const router = useRouter();

  return (
    <S.PaymentDetailForm>
      {selectedPayment.transactions.map((transaction) => (
        <React.Fragment key={transaction.id}>
          <S.ContentRow>
            <span className="content-title">주문번호</span>
            <span className="content-value">{transaction.orderId}</span>
          </S.ContentRow>

          <S.ContentRow>
            <span className="content-title">상품타입</span>
            <span className="content-value">{PAYMENT_TYPE[selectedPayment.paymentType]}</span>
          </S.ContentRow>

          <S.ContentRow>
            <span className="content-title">주문상품</span>
            <span className="content-value">{transaction.orderName}</span>
          </S.ContentRow>

          {selectedPayment.paymentType === 'RECRUITMENT' && (
            <>
              <S.ContentRow>
                <span className="content-title">채용공고</span>
                <motion.span
                  className="content-value"
                  whileHover={{
                    color: '#1a73e8',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                  onClick={() => router.push(`${path.EMPLOYER_RECRUITMENT}/${selectedPayment.recruitment.id}/applicant`)}
                >
                  {selectedPayment.recruitment.recruitmentTitle}
                </motion.span>
              </S.ContentRow>
            </>
          )}

          <S.ContentRow>
            <span className="content-title">카드종류</span>
            <span className="content-value">{transaction.cardType}</span>
          </S.ContentRow>

          <S.ContentRow>
            <span className="content-title">결제종류</span>
            <span className="content-value">{transaction.method}</span>
          </S.ContentRow>

          <S.ContentRow>
            <span className="content-title">결제금액</span>
            <span className="content-value">{priceComma(transaction.totalAmount)}원</span>
          </S.ContentRow>

          <S.ContentRow>
            <span className="content-title">카드번호</span>
            <span className="content-value">{transaction.number}</span>
          </S.ContentRow>

          <S.ContentRow>
            <span className="content-title">할부여부</span>
            <span className="content-value">
              {transaction.installmentPlanMonths === 0 ? 'N' : `${transaction.installmentPlanMonths}개월`}
            </span>
          </S.ContentRow>

          <S.ContentRow>
            <span className="content-title">카드 승인일</span>
            <span className="content-value">{dateFormat.date(transaction.approvedAt, 'YY.MM.DD HH:mm')}</span>
          </S.ContentRow>
        </React.Fragment>
      ))}
    </S.PaymentDetailForm>
  );
}

const S = {
  PaymentDetailForm: styled.div``,
  ContentRow: styled.div`
    display: flex;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
    .content-title {
      flex-basis: 120px;
      height: 100%;
      background-color: ${(props) => props.theme.colors.gray100};
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${(props) => props.theme.colors.black600};
      font-size: 13px;
      font-weight: 300;
    }
    .content-value {
      flex: 1;
      padding-left: 20px;
      font-size: 14px;
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.colors.black200};
    }
  `,
};
