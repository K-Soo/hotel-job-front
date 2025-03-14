import styled from 'styled-components';
import Icon from '@/icons/Icon';
import { LANDING_EMPLOYER } from '@/constants/landing';

export default function RecruitFlow() {
  return (
    <S.RecruitFlow>
      <h2 className="title">채용 절차</h2>
      <div className="progress-container">
        {LANDING_EMPLOYER.map((item, index) => (
          <S.RecruitFlowItem key={index}>
            <div className="wrapper">
              <div className="image-box">{item.emoji}</div>
              <div className="description">
                <strong className="description__title">{item.title}</strong>
                <p className="description__text">{item.desc_1}</p>
                <p className="description__text">{item.desc_2}</p>
              </div>
            </div>
            {item.arrowIcon && <Icon className="arrow-icon" name="ArrowLeft24x24" width="30px" height="30px" />}
          </S.RecruitFlowItem>
        ))}
      </div>
    </S.RecruitFlow>
  );
}

const S = {
  RecruitFlow: styled.div`
    padding: 50px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 500px;
    background: linear-gradient(180deg, rgba(255, 248, 255, 0) 9.98%, #e5e8eb);
    .title {
      font-size: 36px;
      font-weight: 500;
      margin-bottom: 50px;
    }
    .progress-container {
      display: flex;
      flex-wrap: wrap;
    }
  `,
  RecruitFlowItem: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    /* border: 1px solid red; */
    .wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      .image-box {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 34px;
        width: 80px;
        height: 80px;
        /* border: 1px solid red; */
        margin-bottom: 20px;
      }
      .description {
        display: flex;
        flex-direction: column;
        align-items: center;
        /* justify-content: center; */
        &__title {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 15px;
        }
        &__text {
          font-size: 16px;
          color: ${(props) => props.theme.colors.gray700};
          line-height: 1.5;
        }
      }
    }
    .arrow-icon {
      transform: rotate(180deg);
      margin: 0 40px;
    }
  `,
};
