export const educationLevel = {
  ELEMENTARY: '초등학교', // 초등학교
  MIDDLE_SCHOOL: '중학교', // 중학교
  HIGH_SCHOOL: '고등학교', // 고등학교
  COLLEGE_2_3_YEAR: '대학교(2,3년)', // 대학교(2,3년)
  COLLEGE_4_YEAR: '대학교(4년)', // 대학교(4년)
  MASTER: '대학원(석사)', // 대학원(석사)
  DOCTORATE: '대학원(박사)', // 대학원(박사)
} as const;

export const position = {
  INTERN: '인턴',
  PART_TIME: '알바',
  STAFF: '사원',
  ASSISTANT_MANAGER: '대리',
  MANAGER: '과장',
  TEAM_LEADER: '팀장',
  DIRECTOR: '이사',
  GENERAL_MANAGER: '부장',
  EXECUTIVE: '임원',
  CEO: '대표',
} as const;

// 급여 유형
export const salaryType = {
  ANNUAL: '연봉',
  MONTHLY: '월급',
  DAILY: '일급',
  HOURLY: '시급',
  CASE: '건별',
} as const;
