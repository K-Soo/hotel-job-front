export const errorMessages: Record<string, string> = {
  'ERR-8000': '계정이 비활성화되었습니다.',
  'ERR-8001': '계정이 차단되었습니다.',
  'ERR-8002': '계정이 일시적으로 정지되었습니다.',
  'ERR-8003': '계정이 잠겼습니다. 고객센터에 문의해주세요',
  'ERR-8004': '계정이 삭제 처리되었습니다. 다시 가입할 수 없습니다.',
  'ERR-8005': '계정 인증이 완료되지 않았습니다.',
  'ERR-8006': '계정 복구가 진행 중입니다.',
  'ERR-8007': '계정이 익명 처리되었습니다.',
  'ERR-8008': '계정 승인 대기 중입니다.',
  //PAYMENT
  'ERR-4012': '주문을 찾을 수 없습니다. 새로운 주문을 생성해주세요.',
  'ERR-4013': '주문이 만료되었습니다. 다시 주문해 주세요.',
  'ERR-4014': '주문 상태가 유효하지 않습니다. 새로운 주문을 생성해주세요.',
  'ERR-4015': '주문 금액 정보가 유효하지 않습니다. 새로운 주문을 생성해주세요.',
  'ERR-4016': '상품 정보를 찾을 수 없습니다. 새로운 주문을 생성해주세요.',
  'ERR-4020': '본인인증 정보가 없습니다. 계정관리 페이지로 이동합니다.',
  'ERR-4023': '이미 처리된 주문입니다.',
  'ERR-4026': '결제가 완료된 주문건입니다.',

  'ERR-4050': '존재하지 않는 쿠폰입니다.',
  'ERR-4051': '이미 사용된 쿠폰입니다.',
  'ERR-4052': '만료된 쿠폰입니다.',

  'ERR-NOT_FOUND_PAYMENT_SESSION': '결제 시간이 만료되어 결제 진행 데이터가 존재하지 않습니다.',
  'ERR-REJECT_CARD_COMPANY': '카드사에서 해당 카드를 거절했거나 카드사에 문제가 있습니다.',
  'ERR-FORBIDDEN_REQUEST': '최초 결제 요청한 값과 일치하지않습니다.',
  'ERR-UNAUTHORIZED_KEY': '인증되지 않은 결제 요청입니다.',
  'ERR-ALREADY_PROCESSED_PAYMENT': '이미 처리된 결제 입니다.',
};
