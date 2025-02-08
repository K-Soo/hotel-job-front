export const RECRUITMENT_STATUS = {
  PROGRESS: '진행중',
  PUBLISHED: '대기중',
  CLOSED: '마감',
  REVIEWING: '확인중',
  DRAFT: '미완성',
};

export const RECRUITMENT_STATUS_WITH_ALL = {
  ALL: '전체',
  PROGRESS: '진행중',
  PUBLISHED: '대기중',
  CLOSED: '마감',
  REVIEWING: '확인중',
  DRAFT: '미완성',
};

// 모집 경력
export const EXPERIENCE_CONDITION = {
  NEWBIE: '신입',
  EXPERIENCED: '경력',
  NOT_REQUIRED: '경력무관',
} as const;

export const EMPLOYMENT_TYPE = {
  FULL_TIME: '정규직',
  CONTRACT: '계약직',
  PART_TIME: '아르바이트',
  DAILY_WORKER: '파출부',
  INTERN: '인턴',
} as const;

export const WORKING_DAY_LIST = {
  WEEKDAYS_5: '주 5일',
  WEEKDAYS_6: '주 6일',
  WEEKEND_DAY: '주말 주간 (토, 일)',
  WEEKEND_NIGHT: '주말 야간 (토, 일)',
  NIGHT: '야간 고정',
  TO_BE_DECIDED: '면접 후 결정',

  TWO_SHIFT_DAY_DAY_NIGHT_NIGHT: '2교대 (주주야야)',
  TWO_SHIFT_DAY_NIGHT_OFF_OFF: '2교대 (주야비비)',
  TWO_SHIFT_DAY_NIGHT: '2교대 (주야주야)',

  THREE_SHIFT_DAY_DAY_NIGHT_NIGHT_OFF_OFF: '3교대 (주주야야비비)',
  THREE_SHIFT_DAY_NIGHT_OFF: '3교대 (주야비)',
  THREE_SHIFT_MORNING_AFTERNOON_NIGHT: '3교대 (오전/오후/심야)',
  ALTERNATE_DAY_SHIFT: '격일제 (24시간 주간 맞교대)',
  ALTERNATE_NIGHT_SHIFT: '격일제 (24시간 야간 맞교대)',
  ALTERNATE_2DAY_OFF: '격일제 (24시간 근무 2일 휴무)',
};
