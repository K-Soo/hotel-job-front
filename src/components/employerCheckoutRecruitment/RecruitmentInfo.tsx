import styled from 'styled-components';
import { PaymentRecruitmentInfo } from '@/types';

interface RecruitmentInfoProps {
  recruitmentInfo: PaymentRecruitmentInfo | undefined;
}

export default function RecruitmentInfo({ recruitmentInfo }: RecruitmentInfoProps) {
  return (
    <S.RecruitmentInfo>
      <div>
        <div>{recruitmentInfo?.recruitmentTitle}</div>
        <div>
          {recruitmentInfo?.jobs.map((el) => (
            <div>{el}</div>
          ))}
        </div>
      </div>
    </S.RecruitmentInfo>
  );
}

const S = {
  RecruitmentInfo: styled.div`
    padding: 30px;
  `,
};
