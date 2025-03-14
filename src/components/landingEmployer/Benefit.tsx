import { BENEFIT } from '@/constants/landing';
import styled from 'styled-components';

export default function Benefit() {
  return (
    <S.Benefit>
      <div className="header">
        <p className="description">
          호텔잡 파트너 회원이 되면 <br />
          <b>받을 수 있는 혜택</b>이에요
        </p>
        <p className="description"></p>
      </div>

      <div className="list">
        {BENEFIT.map((item, index) => (
          <div className="item" key={index}>
            <div className="item__description">
              <span className="item__description--tag">혜택 #{index + 1}</span>
              <h3 className="item__description--title">{item.title}</h3>
              <p className="item__description--text">{item.desc}</p>
            </div>
            {/* image */}
            <div className="item__image-box"></div>
          </div>
        ))}
      </div>
    </S.Benefit>
  );
}

const S = {
  Benefit: styled.div`
    width: 100%;
    max-width: 1024px;
    width: 100%;
    padding: 100px 20px;
    margin: 0 auto;
    min-height: 500px;
    ${(props) => props.theme.media.tablet`
      padding: 50px 20px;
    `};
    .header {
      margin-bottom: 50px;
      .description {
        font-size: 32px;
        font-weight: 500;
        line-height: 1.3;
        b {
          color: ${(props) => props.theme.colors.blue400};
        }
        ${(props) => props.theme.media.tablet`
          font-size: 26px;
        `};
      }
    }
    .list {
      .item {
        display: flex;
        margin-bottom: 60px;
        &__description {
          flex: 50%;
          &--tag {
            display: inline-block;
            font-size: 18px;
            color: ${(props) => props.theme.colors.blue600};
            margin-bottom: 20px;
          }
          &--title {
            font-size: 24px;
            font-weight: 500;
            line-height: 1.2;
            margin-bottom: 10px;
          }
          &--text {
            font-size: 18px;
            color: ${(props) => props.theme.colors.gray700};
            line-height: 1.5;
          }
        }
      }
    }
  `,
};
