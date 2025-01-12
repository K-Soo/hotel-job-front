export const hotelJobs = {
  CLEANING: '청소',
  COUPLE_TEAM: '부부팀',
  BEDDING: '배팅',
  CASHIER: '프론트 캐셔',
  DUTY_OFFICER: '당번',
  DUTY_ASSISTANT: '당번 보조',
  CHEF: '주방',
  KITCHEN_ASSISTANT: '주방 보조',
  MANAGER: '지배인',
};

type HotelJobsKey = keyof typeof hotelJobs;

export const hotelJobKeyValues = Object.keys(hotelJobs).reduce((acc, key) => {
  acc[key as HotelJobsKey] = key as HotelJobsKey;
  return acc;
}, {} as Record<HotelJobsKey, HotelJobsKey>);

export const touristHotelJobs = {
  GENERAL_MANAGER: '총지배인',
  ROOM_MANAGER: '객실지배인',
  BANQUET_MANAGER: '연회부 지배인',
  FOOD_BEVERAGE_MANAGER: '식음료부 지배인',
  OTHER_MANAGER: '기타 지배인',
  HOUSEKEEPING: '객실 관리',
  ROOM_ATTENDANT: '객실 청소',
  FRONT_DESK: '프론트 데스크 캐셔',
  CONCIERGE: '컨시어지',
  VALET_PARKING: '발레파킹',
  BELLBOY: '벨보이',
  EVENT_COORDINATOR: '이벤트 코디네이터',
  SPA_THERAPIST: '스파 테라피스트',
  SPA_MANAGER: '스파 매니저',
  FITNESS_TRAINER: '피트니스 트레이너',
  RESTAURANT_MANAGER: '레스토랑 매니저',
  BARTENDER: '바텐더',
  HEAD_CHEF: '요리사',
  TOUR_COORDINATOR: '관광 프로그램 코디네이터',
  CASINO_DEALER: '카지노 딜러',
  GIFT_SHOP_ATTENDANT: '기프트숍 직원',
  POOL_ATTENDANT: '수영장 관리 요원',
  KIDS_CLUB_STAFF: '키즈 클럽 직원',
};

type TouristHotelJobsKey = keyof typeof touristHotelJobs;

export const touristHotelJobsKeyValues = Object.keys(touristHotelJobs).reduce((acc, key) => {
  acc[key as TouristHotelJobsKey] = key as TouristHotelJobsKey;
  return acc;
}, {} as Record<TouristHotelJobsKey, TouristHotelJobsKey>);

export const otherJobs = {
  MAINTENANCE: '시설 관리',
  SECURITY: '보안',
  MANAGEMENT: '경영',
  MARKETING: '마케팅',
  IT_SUPPORT: 'IT 지원',
  ADMIN_SUPPORT: '경영지원',
  FACILITY_CLEANER: '시설 미화원',
  PARKING_ATTENDANT: '주차장 관리',
  OTHER: '기타',
};

type OtherJobsKey = keyof typeof otherJobs;

export const otherJobsKeyValues = Object.keys(otherJobs).reduce((acc, key) => {
  acc[key as OtherJobsKey] = key as OtherJobsKey;
  return acc;
}, {} as Record<OtherJobsKey, OtherJobsKey>);

export const allJobs = {
  ...otherJobs,
  ...touristHotelJobs,
  ...hotelJobs,
} as const;

export type AllJobsKeyValuesKeys = keyof typeof allJobs;

export const allJobsKeyValues = Object.keys(allJobs).reduce((acc, key) => {
  acc[key as AllJobsKeyValuesKeys] = key as AllJobsKeyValuesKeys;
  return acc;
}, {} as Record<AllJobsKeyValuesKeys, AllJobsKeyValuesKeys>);

export const allJobsKeyValuesKeys = Object.keys(allJobsKeyValues) as AllJobsKeyValuesKeys[];
