export const signInTabOptions = [
  { label: '일반회원', value: 'general' },
  { label: '기업회원', value: 'company' },
] as const;

export const recruitOrderFilterTabOptions = [
  { label: '최신순', value: '1' },
  { label: '인기순', value: '2' },
] as const;

export const recruitmentStatusTabOptions = [
  { label: '전체', value: 'all' },
  { label: '진행중', value: 'progress' },
  { label: '대기중', value: 'pending' },
  { label: '마감', value: 'closed' },
  { label: '확인중', value: 'reviewing' },
  { label: '미완성', value: 'incomplete' },
] as const;
