import styled from 'styled-components';
import { MEMBERSHIP } from '@/constants/membership';
import { formatToManWon } from '@/utils';

export default function MembershipModalForm() {
  return (
    <S.MembershipModalForm>
      <S.FormHeader>
        <p className="item level">등급</p>
        <p className="item score">등급기준</p>
        <p className="item discount">즉시할인</p>
        <p className="item benefit-box">회원혜택</p>
      </S.FormHeader>

      <S.MembershipContent>
        {MEMBERSHIP.map((membership) => {
          const isFamily = membership.membershipLevel === 'FAMILY';
          const isVip = membership.membershipLevel === 'VIP';

          return (
            <S.MembershipItem key={membership.discountRate}>
              <p className="level">{membership.membershipLevel}</p>

              <p className="score">
                {isFamily ? <span>신규</span> : <span>{formatToManWon(membership.minScore)}만원</span>}
                <span> ~ </span>
                {!isVip && <span>{formatToManWon(membership.maxScore)}만원</span>}
              </p>

              {isFamily ? <p className="discount">-</p> : <p className="discount">{membership.discountRate * 100}%</p>}

              <p className="benefit-box">
                {membership.description.map((desc, index) => (
                  <span key={index} className="benefit-box__text">
                    {desc}
                  </span>
                ))}
              </p>
            </S.MembershipItem>
          );
        })}
      </S.MembershipContent>
    </S.MembershipModalForm>
  );
}

const S = {
  MembershipModalForm: styled.div`
    font-size: 13px;
  `,
  FormHeader: styled.div`
    display: flex;
    .item {
      height: 40px;
      background-color: ${({ theme }) => theme.colors.gray100};
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .level {
      font-weight: 400;
      flex-basis: 100px;
    }
    .score {
      flex-basis: 120px;
    }
    .discount {
      flex-basis: 80px;
    }
    .benefit-box {
      flex: 1;
    }
  `,
  MembershipContent: styled.div``,
  MembershipItem: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    min-height: 50px;
    text-align: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
    .level {
      font-weight: 400;
      flex-basis: 100px;
    }
    .score {
      flex-basis: 120px;
    }
    .discount {
      flex-basis: 80px;
    }
    .benefit-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .benefit-box__text {
        padding: 2px 0;
      }
    }
  `,
};
