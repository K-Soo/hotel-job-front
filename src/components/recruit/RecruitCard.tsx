import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

interface RecruitCardProps {}

export default function RecruitCard({}: RecruitCardProps) {
  const handleClickCard = () => {
    window.open('/recruit/1', '_blank');
  };

  return (
    <S.RecruitCard
      onClick={() => handleClickCard()}
      whileHover={{
        backgroundColor: '#FFF',
      }}
      transition={{ duration: 0 }}
    >
      <div className="location">
        <div>서울</div>
        <div>송파구</div>
      </div>

      <div className="detail">
        <div className="detail__content">
          <div>영주온천 관광호텔</div>
          <h6 className="detail__content--title">당번 구합니다</h6>
        </div>
      </div>

      <div className="occupation">지배인</div>

      <div className="info">
        <div>경력 무관</div>
        <div>정규직</div>
        <div>외국인 무관</div>
      </div>

      <div className="support">
        <span>15일전 등록</span>
      </div>
    </S.RecruitCard>
  );
}

const S = {
  RecruitCard: styled(motion.article)`
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid hsla(0, 0%, 92%, 1);
    padding: 15px;
    cursor: pointer;
    font-size: 14px;
    height: 100px;

    .detail {
      flex: 35%;
      display: flex;
      flex-direction: column;
      &__content {
        &--title {
          color: #292e41;
          font-weight: 600;
        }
      }
    }
    .occupation {
      flex: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .location {
      flex: 10%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .info {
      flex: 10%;
      display: flex;
      flex-direction: column;
      font-size: 13px;
      color: #475067;
    }
    .support {
      flex: 10%;
      display: flex;
      flex-direction: column;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `,
};
