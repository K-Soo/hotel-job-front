export const careerLevel = {
  NEWBIE: 'NEWBIE', // 신입
  EXPERIENCED: 'EXPERIENCED', // 경력
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

export const licenseStage = {
  FIRST: 'FIRST', // 1차 합격
  SECOND: 'SECOND', // 2차 합격
  WRITTEN: 'WRITTEN', // 필기 합격
  PRACTICAL: 'PRACTICAL', // 실기 합격
  FINAL: 'FINAL', // 최종 합격
};
