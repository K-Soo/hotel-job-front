export const PAYMENT_STATUS = {
  PAYMENT_PENDING: '결제 대기 중', // 결제 대기 중
  PAYMENT_COMPLETED: '결제완료', // 결제 성공
  PAYMENT_FAILED: '결제실패', // 결제 실패
  PAYMENT_EXPIRED: '결제 유효 기간 초과', // 결제 유효 기간 초과

  CANCEL_REQUESTED: '취소 요청됨', // 취소 요청됨
  CANCEL_COMPLETED: '취소 완료', // 취소 완료

  REFUND_REQUESTED: '환불 요청됨', // 환불 요청됨
  REFUND_COMPLETED: '환불 완료', // 환불 완료
  PARTIALLY_REFUNDED: '부분 환불 완료', // 부분 환불 완료
} as const;

export const PAYMENT_TYPE = {
  RECRUITMENT: '채용공고',
} as const;
