import { CertificationStatus, EmployerBusinessForm } from '@/types';
import styled from 'styled-components';
import Line from '@/components/common/Line';
import { useRouter } from 'next/router';
import path from '@/constants/path';
import Icon from '@/icons/Icon';
import IconHover from '@/components/common/IconHover';
import Tag from '@/components/common/Tag';

interface CompanyInfoProps {
  data: EmployerBusinessForm | undefined;
  certificationStatus: CertificationStatus | undefined;
}

export default function CompanyInfo({ data, certificationStatus }: CompanyInfoProps) {
  const router = useRouter();

  return (
    <S.CompanyInfo>
      <div className="top">
        <p className="top__company">{data?.companyName ?? 'unknown'}</p>
        {certificationStatus === 'VERIFIED' && (
          <button className="top__register" onClick={() => router.push(path.EMPLOYER_RECRUITMENT_REGISTER)}>
            <strong className="top__register--move">공고 등록</strong>
            <span>으로 시작</span>
          </button>
        )}
      </div>
      <Line />
      <div className="bottom">
        <p className="bottom__owner">
          <span>{data?.businessOwner ?? 'unknown'}</span>
          {certificationStatus === 'VERIFIED' && <Tag type="VERIFIED" label="인증완료" margin="0 0 0 10px" />}
          {certificationStatus !== 'VERIFIED' && <Tag type="UNVERIFIED" label="미인증" margin="0 0 0 10px" />}
        </p>
        <IconHover onClick={() => router.push(path.EMPLOYER_ACCOUNT)}>
          <Icon name="Settings24x24" width="18px" height="18px" />
        </IconHover>
      </div>
    </S.CompanyInfo>
  );
}

const S = {
  CompanyInfo: styled.div`
    flex-basis: 400px;
    height: 180px;
    border: 1px solid ${({ theme }) => theme.colors.gray400};
    border-radius: 10px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      flex: 1;
      &__company {
        font-size: 20px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.black};
      }
      &__register {
        margin-top: 20px;
        font-size: 18px;
        cursor: pointer;
        font-weight: 500;
        &:hover {
          text-decoration: underline;
        }
        &--move {
          color: ${({ theme }) => theme.colors.blue600};
          &:hover {
            color: ${({ theme }) => theme.colors.blue600};
          }
        }
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 18px;
      &__owner {
        margin-right: 30px;
        display: flex;
        align-items: center;
      }
    }
  `,
};
