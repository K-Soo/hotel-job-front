export const REVIEW_STAGE_STATUS = {
  DOCUMENT: '서류전형',
  INTERVIEW: '면접전형',
  FINAL_ACCEPT: '최종합격',
  REJECT: '불합격',
} as const;

export const EMPLOYER_REVIEW_STAGE_STATUS = {
  DOCUMENT: '서류전형',
  INTERVIEW: '면접전형',
  ACCEPT: '최종합격',
  REJECT: '불합격',
} as const;

export const EMPLOYER_REVIEW_STAGE_STATUS_WIDTH_TOTAL = {
  TOTAL: '전체',
  DOCUMENT: '서류전형',
  INTERVIEW: '면접전형',
  ACCEPT: '최종합격',
  REJECT: '불합격',
} as const;

export const APPLICATION_STATUS = {
  APPLIED: '지원완료',
  CANCELED: '지윈취소',
} as const;
