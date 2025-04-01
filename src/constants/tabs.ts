export const signInTabOptions = [
  { label: '개인회원', value: 'general' },
  { label: '업체회원', value: 'company' },
] as const;

export const recruitOrderFilterTabOptions = [
  { label: '최신순', value: '1' },
  { label: '인기순', value: '2' },
] as const;

export const recruitmentStatusTabOptions = [
  { label: '전체', value: 'ALL' },
  { label: '진행중', value: 'PROGRESS' },
  { label: '대기중', value: 'PUBLISHED' },
  { label: '마감', value: 'CLOSED' },
  { label: '확인중', value: 'REVIEWING' },
  { label: '미완성', value: 'DRAFT' },
] as const;
