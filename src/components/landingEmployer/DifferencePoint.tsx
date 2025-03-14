import { DIFFERENCE_POINTS } from '@/constants/landing';
import styled from 'styled-components';

export default function DifferencePoint() {
  return (
    <S.DifferencePoint>
      <h2 className="title">타사 호텔업계 사이트와 뭐가 다를까?</h2>
      <S.DifferencePointContent>
        {DIFFERENCE_POINTS.map((item, index) => (
          <div className="item" key={index}>
            <div className="description">
              <h3 className="description__title">{item.title}</h3>
              <p className="description__text">{item.desc}</p>
            </div>
          </div>
        ))}
      </S.DifferencePointContent>
    </S.DifferencePoint>
  );
}

const S = {
  DifferencePoint: styled.div`
    padding: 100px 20px;
    min-height: 400px;
    background-color: #f4f8ff;
    ${(props) => props.theme.media.tablet`
      padding: 50px 20px;
    `};
    .title {
      text-align: center;
      font-size: 36px;
      font-weight: 500;
      margin-bottom: 50px;
      ${(props) => props.theme.media.tablet`
        font-size: 20px;
      `};
    }
  `,
  DifferencePointContent: styled.div`
    margin: 0 auto;
    max-width: 768px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    .item {
      flex-basis: calc(50% - 10px);
      min-height: 200px;
      height: 100%;
      background-color: white;
      border-radius: 20px;
      display: flex;
      padding: 30px;
      ${(props) => props.theme.media.tablet`
        min-height: 220px;
      `};
      ${(props) => props.theme.media.mobile`
        padding: 15px;
        min-height: 210px;
      `};
      .description {
        &__title {
          font-size: 24px;
          font-weight: 500;
          margin-bottom: 20px;
          line-height: 1.2;
          ${(props) => props.theme.media.tablet`
            font-size: 19px;
          `};
          ${(props) => props.theme.media.mobile`
            font-size: 16px;
          `};
        }
        &__text {
          font-size: 16px;
          line-height: 1.5;
          color: ${(props) => props.theme.colors.gray600};
          white-space: pre-line;
          ${(props) => props.theme.media.mobile`
            font-size: 14px;
          `};
        }
      }
    }
  `,
};
