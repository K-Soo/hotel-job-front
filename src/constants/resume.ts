export const CAREER_LEVEL = {
  NEWBIE: '신입',
  EXPERIENCED: '경력',
} as const;

export const position = {
  NONE: 'NONE', // 미선택
  INTERN: 'INTERN', // 인턴
  PART_TIME: 'PART_TIME', // 알바
  STAFF: 'STAFF', // 사원
  ASSISTANT_MANAGER: 'ASSISTANT_MANAGER', // 대리
  MANAGER: 'MANAGER', // 과장
  TEAM_LEADER: 'TEAM_LEADER', // 팀장
  DIRECTOR: 'DIRECTOR', // 이사
  GENERAL_MANAGER: 'GENERAL_MANAGER', // 부장
  EXECUTIVE: 'EXECUTIVE', // 임원
  CEO: 'CEO', // 대표
} as const;

export const LICENSE_STAGE = {
  FINAL: '최종 합격',
  FIRST: '1차 합격',
  SECOND: '2차 합격',
  WRITTEN: '필기 합격',
  PRACTICAL: '실기 합격',
} as const;

export const SANCTION_REASON = {
  NONE: 'NONE', // 제재 없음
  INAPPROPRIATE_LANGUAGE: 'INAPPROPRIATE_LANGUAGE', //욕설 또는 부적절한 언어 사용
  FALSE_INFORMATION: 'FALSE_INFORMATION', // 허위 정보 입력
  ILLEGAL_CONTENT: 'ILLEGAL_CONTENT', // 불법적 콘텐츠 포함
  POLICY_VIOLATION: 'POLICY_VIOLATION', // 기타 정책 위반
};

export const RESUME_STATUS = {
  DRAFT: 'DRAFT', // 작성 중(임시 저장 상태).
  PUBLISH: 'PUBLISH', // 제출 완료(정상 노출 가능 상태).
  HIDDEN: 'HIDDEN', // 사용자가 비공개 상태로 설정.
  ERROR: 'ERROR', // 처리 중 오류 발생.
};
