import styled from "styled-components";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

interface RecruitCardProps {}

export default function RecruitCard({}: RecruitCardProps) {
  const handleClickCard = () => {
    window.open("/recruit/1", "_blank");
  };

  return (
    <S.RecruitCard
      onClick={() => handleClickCard()}
      whileHover={{
        backgroundColor: "red",
      }}
    >
      <div className="company">
        <div>메이호텔</div>
      </div>

      <div className="detail">
        <div className="detail__tag">
          <span className="detail__tag--item">급구</span>
          <span className="detail__tag--item">TODAY</span>
          <span className="detail__tag--item">숙식 가능</span>
        </div>

        <div className="detail__content">
          <h6 className="detail__content--title">당번 구합니다</h6>
        </div>
      </div>

      <div className="occupation">지배인</div>

      <div className="location">
        <div>서울</div>
        <div>송파구</div>
      </div>

      <div className="info">
        <div>경력 무관</div>
        <div>정규직</div>
        <div>외국인 무관</div>
      </div>

      <div className="support">
        <button>입사지원</button>
        <time>~10.15(화)</time>
        <span>15일전 등록</span>
      </div>
    </S.RecruitCard>
  );
}

const S = {
  RecruitCard: styled(motion.article)`
    display: flex;
    width: 100%;
    border-bottom: 1px solid #000;
    padding: 15px;
    cursor: pointer;
    .company {
      flex: 15%;
    }
    .detail {
      flex: 35%;
      display: flex;
      flex-direction: column;
      &__tag {
        &--item {
          background-color: #f4f6fa;
          margin-right: 10px;
        }
      }
    }
    .occupation {
      flex: 10%;
    }
    .location {
      flex: 10%;
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
    }
  `,
};
