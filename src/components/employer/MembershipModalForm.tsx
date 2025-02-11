import styled from 'styled-components';
import { MEMBERSHIP } from '@/constants/membership';
import { formatToManWon } from '@/utils';

interface MembershipModalFormProps {}

export default function MembershipModalForm({}: MembershipModalFormProps) {
  return (
    <S.MembershipModalForm>
      <S.FormHeader>
        <p className="item">등급</p>
        <p className="item">등급기준</p>
        <p className="item">즉시할인</p>
        <p className="item">회원혜택</p>
      </S.FormHeader>

      <S.MembershipContent>
        {MEMBERSHIP.map((membership) => {
          const isFamily = membership.membershipLevel === 'FAMILY';
          const isVip = membership.membershipLevel === 'VIP';

          return (
            <S.MembershipItem key={membership.discountRate}>
              <p className="level">{membership.membershipLevel}</p>

              <p>
                {isFamily ? <span>신규</span> : <span>{formatToManWon(membership.minScore)}만원</span>}
                <span> ~ </span>
                {!isVip && <span>{formatToManWon(membership.maxScore)}만원</span>}
              </p>

              <p>{membership.discountRate * 100}%</p>
              <p>1회 무료쿠폰</p>
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
      flex: 1;
      height: 50px;
      background-color: ${({ theme }) => theme.colors.gray100};
      display: flex;
      align-items: center;
      justify-content: space-around;
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
      font-weight: 500;
    }
    p {
      flex: 1;
    }
  `,
};
