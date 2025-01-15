import { RecruitListItem } from '@/types';
import { employmentType } from '@/constants/recruitment';

// 고용형태 한글 포멧팅
export function employmentTypeFormat(employment: RecruitListItem['employmentType']): string {
  const selectedTypes = Object.entries(employment)
    .filter(([, value]) => value === true)
    .map(([key]) => employmentType[key as keyof RecruitListItem['employmentType']]);

  if (selectedTypes.length > 1) {
    return `${selectedTypes[0]} 외 ${selectedTypes.length - 1}`;
  }
  return typeof selectedTypes[0] === 'string' ? selectedTypes[0] : '';
}
