export const recruitmentStatus = {
  PROGRESS: '진행중',
  PUBLISHED: '대기중',
  CLOSED: '마감',
  REVIEWING: '확인중',
  DRAFT: '미완성 공고',
};

export const recruitmentStatusWithAll = {
  ALL: '전체',
  PROGRESS: '진행중',
  PUBLISHED: '대기중',
  CLOSED: '마감',
  REVIEWING: '확인중',
  DRAFT: '미완성',
};

// 모집 경력
export const experienceCondition = {
  NEWBIE: 'NEWBIE', // 신입
  EXPERIENCED: 'EXPERIENCED', // 경력
  NOT_REQUIRED: 'NOT_REQUIRED', // 경력 무관
} as const;
