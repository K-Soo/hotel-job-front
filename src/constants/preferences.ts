export const licensePreferences = {
  LICENSE_HOTEL_ADMINISTRATOR: '호텔관리사',
  LICENSE_FOOD_SANITATION_MANAGER: '식품위생관리사',
  LICENSE_TOURISM_INTERPRETER_GUIDE: '관광통역안내사',
  LICENSE_BARISTA: '바리스타',
  LICENSE_GUEST_SERVICE_MANAGER: '서비스경영자격(SMAT)',
  LICENSE_FIRST_AID: '응급처치 자격증',
  LICENSE_SECURITY_GUARD: '경비지도사',
  LICENSE_HOUSEKEEPING_CERTIFICATE: '객실관리사',
  LICENSE_FOOD_AND_BEVERAGE_MANAGER: '조주기능사',
  LICENSE_CUSTOMER_SERVICE_CERTIFICATE: 'CS Leaders 자격증',
} as const;

export const languagePreferences = {
  LANGUAGE_KOREAN: '한국어',
  LANGUAGE_ENGLISH: '영어',
  LANGUAGE_SPANISH: '스페인어',
  LANGUAGE_CHINESE: '중국어',
  LANGUAGE_JAPANESE: '일본어',
  LANGUAGE_FRENCH: '프랑스어',
  LANGUAGE_RUSSIAN: '러시아어',
  LANGUAGE_MONGOLIAN: '몽골어',
} as const;

export const workingConditionsPreferences = {
  NEAR_RESIDENT: '인근거주자',
  VEHICLE_OWNER: '차량소지자',
  // OVERSEAS_WORK: '해외근무 가능자',
  NIGHT_SHIFT: '야간근무 가능자',
  TWO_SHIFT: '2교대근무 가능자',
  THREE_SHIFT: '3교대근무 가능자',
  DRIVER: '운전가능자',
  DORMITORY_LIFE: '기숙사 생활가능자',
  REGIONAL_WORK: '지방근무 가능자',
  ALTERNATE_SHIFT: '격일근무 가능자',
};

export const skillsAndAbilitiesPreferences = {
  GPA_ABOVE_4: '학점 4.0 이상',
  COMPUTER_SKILLS_EXCELLENT: '컴퓨터활용능력 우수',
  EXCEL_ADVANCED: '엑셀 고급능력자',
  // CAD_CAM_EXPERT: 'CAD/CAM 능숙자',
  // FLASH_EXPERT: 'FLASH 능숙자',
  PPT_SKILLS_EXCELLENT: 'PPT능력 우수자',
  STATISTICAL_ANALYSIS_EXPERT: '통계분석능숙자',
  DOCUMENT_WRITING_EXCELLENT: '문서작성 우수자',
  ACCOUNTING_EXPERT: '더존/회계 능숙자',
  PHOTOSHOP_EXPERT: '포토샵 능숙자',
  // MAC_EDITING_EXPERT: 'MAC/편집 전문가',
};

export const facilityManagementPreferences = {
  SAFETY_MANAGER_CERTIFICATE: '산업안전관리자',
  BOILER_ENGINEER_CERTIFICATE: '보일러기능사',
  ELECTRICIAN_CERTIFICATE: '전기기능사',
  PLUMBING_TECHNICIAN_CERTIFICATE: '배관기능사',
  FIRE_SAFETY_MANAGER: '소방안전관리자',
  AIR_CONDITIONING_ENGINEER: '에어컨설비기능사',
  ENVIRONMENTAL_ENGINEER: '환경관리사',
  ENERGY_MANAGER_CERTIFICATE: '에너지관리기능사',
  BUILDING_MAINTENANCE_CERTIFICATE: '건축설비산업기사',
};

export const preferences = {
  ...languagePreferences,
  ...licensePreferences,
  ...workingConditionsPreferences,
  ...skillsAndAbilitiesPreferences,
  ...facilityManagementPreferences,
} as const;
