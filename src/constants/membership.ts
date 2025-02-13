export const MEMBERSHIP_LEVEL = {
  FAMILY: 'FAMILY',
  BRONZE: 'BRONZE',
  SILVER: 'SILVER',
  GOLD: 'GOLD',
  VIP: 'VIP',
} as const;

const MAX_SCORE = 10_000_000_000;

export const MEMBERSHIP = [
  { membershipLevel: MEMBERSHIP_LEVEL.FAMILY, discountRate: 0, minScore: 0, maxScore: 100_000, description: ['기본공고 10일권 무료'] }, // ~10만 원
  {
    membershipLevel: MEMBERSHIP_LEVEL.BRONZE,
    discountRate: 0.02,
    minScore: 100_001,
    maxScore: 300_000,
    description: ['매월 할인쿠폰 1,000원'],
  }, // 10만 ~ 30만 원
  {
    membershipLevel: MEMBERSHIP_LEVEL.SILVER,
    discountRate: 0.03,
    minScore: 300_001,
    maxScore: 600_000,
    description: ['매월 할인쿠폰 2,000원'],
  }, // 30만 ~ 60만 원
  {
    membershipLevel: MEMBERSHIP_LEVEL.GOLD,
    discountRate: 0.04,
    minScore: 600_001,
    maxScore: 1_000_000,
    description: ['매월 할인쿠폰 3,000원'],
  }, // 60만 ~ 100만 원
  {
    membershipLevel: MEMBERSHIP_LEVEL.VIP,
    discountRate: 0.06,
    minScore: 1_000_001,
    maxScore: MAX_SCORE,
    description: ['매월 할인쿠폰 4,000원'],
  }, // 100만 원 초과
] as const;
