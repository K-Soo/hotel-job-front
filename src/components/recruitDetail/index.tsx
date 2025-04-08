import styled from 'styled-components';
import RecruitDetailLocation from '@/components/recruitDetail/RecruitDetailLocation';
import RecruitDetailPeriod from '@/components/recruitDetail/RecruitDetailPeriod';
import RecruitDetailDateTime from '@/components/recruitDetail/RecruitDetailDateTime';
import RecruitDetailWorkCondition from '@/components/recruitDetail/RecruitDetailWorkCondition';
import RecruitDetailInfo from '@/components/recruitDetail/RecruitDetailInfo';
import RecruitDetailFavoriteShareBar from '@/components/recruitDetail/RecruitDetailFavoriteShareBar';
import RecruitDetailContent from '@/components/recruitDetail/RecruitDetailContent';
import { IRecruitDetail } from '@/types';
import dynamic from 'next/dynamic';

const DynamicKakaoMap = dynamic(() => import('@/components/common/KakaoMap'), { ssr: false });

interface RecruitDetailProps {
  data: IRecruitDetail;
  children: React.ReactNode;
}

// TODO - 업체이미지, 날짜
export default function RecruitDetail({ data, children }: RecruitDetailProps) {
  return (
    <S.RecruitDetail>
      {/* <S.Images></S.Images> */}
      <div className="detail-container">
        <div className="detail-container__content-form">
          <div className="flex items-center justify-between">
            <RecruitDetailDateTime createdAt={data.createdAt} />
            <RecruitDetailFavoriteShareBar hotelName={data.hotelName} recruitmentTitle={data.recruitmentTitle} />
          </div>

          <S.UtilPanel>
            <div className="wrapper">
              <strong className="hotel-name">{data.hotelName}</strong>
              <address className="addr sido">{data.address.split(' ')[0]}</address>
              <address className="addr sigungu">{data.address.split(' ')[1]}</address>
            </div>
          </S.UtilPanel>

          <S.Header>
            <h1 className="title">{data.recruitmentTitle}</h1>
          </S.Header>

          <S.Title>근무 조건</S.Title>
          <RecruitDetailWorkCondition
            employment={data.employmentType}
            workingTime={data.workingTime}
            workingDay={data.workingDay}
            salaryType={data.salaryType}
            salaryAmount={data.salaryAmount}
          />

          <S.Title>모집 내용</S.Title>
          <RecruitDetailInfo
            jobs={data.jobs}
            educationCondition={data.educationCondition}
            recruitmentCapacity={data.recruitmentCapacity}
            experienceCondition={data.experienceCondition}
            department={data.department}
            position={data.position}
            nationality={data.nationality}
          />

          <S.Title>상세 내용</S.Title>
          <RecruitDetailContent content={data.content} />

          <RecruitDetailPeriod managerEmail={data.managerEmail} managerName={data.managerName} managerNumber={data.managerNumber} />

          <S.Title>근무지 위치</S.Title>
          <RecruitDetailLocation address={data.address} addressDetail={data.addressDetail} />
          <DynamicKakaoMap address={data.address} />
        </div>
        {children}
      </div>
    </S.RecruitDetail>
  );
}

const S = {
  RecruitDetail: styled.section`
    .detail-container {
      display: flex;
      &__content-form {
        flex: 1 1 100%;
      }
    }
  `,
  Images: styled.article`
    height: 350px;
    border-radius: 15px;
    background-color: gray;
    margin-bottom: 30px;
  `,
  Header: styled.article`
    .title {
      font-size: 24px;
      font-weight: 500;
      line-height: 1.1;
      ${(props) => props.theme.media.mobile`
        font-size: 18px;
      `};
    }
    margin-bottom: 50px;
  `,
  Content: styled.article`
    min-height: 500px;
    margin-bottom: 50px;
  `,
  Title: styled.h2`
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 15px;
    user-select: none;
    ${(props) => props.theme.media.mobile`
      font-size: 22px;
      margin-bottom: 8px;
    `};
  `,
  UtilPanel: styled.article`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 8px;
    .wrapper {
      display: flex;
      align-items: center;
      .hotel-name {
        font-size: 18px;
      }
      .addr {
        font-size: 14px;
        color: ${(props) => props.theme.colors.gray800};
      }
      .sido {
        padding-right: 3px;
      }
      .sido {
        &::before {
          content: '∙';
          padding: 0 8px;
          font-size: 20px;
          font-size: 14px;
        }
      }
    }
  `,
};
