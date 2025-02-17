import { ResumeLstItemApplications } from '@/types';
import styled from 'styled-components';
import { dateFormat } from '@/utils';
import { useRouter } from 'next/router';

interface ResumeHistoryItemProps {
  item: ResumeLstItemApplications;
}

export default function ResumeHistoryItem({ item }: ResumeHistoryItemProps) {
  const router = useRouter();

  return (
    <S.ResumeHistoryItem>
      <S.InfoBox>
        <div className="hotel">{item.recruitment?.hotelName}</div>
        <div
          className="title"
          onClick={() => {
            router.push(`/recruit/${item.recruitment.id}`);
          }}
        >
          {item.recruitment?.recruitmentTitle}
        </div>
      </S.InfoBox>

      <S.DateBox>
        <div className="apply">
          <p className="apply__value">{dateFormat.date(item.applyAt, 'YY.MM.DD')}</p>
          <span>접수</span>
        </div>

        {item.cancelAt && (
          <div className="cancel">
            <p className="cancel__value">{dateFormat.date(item.cancelAt, 'YY.MM.DD')}</p>
            <p>지원취소</p>
          </div>
        )}
      </S.DateBox>
    </S.ResumeHistoryItem>
  );
}

const S = {
  ResumeHistoryItem: styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
    padding: 15px 0;
    &:last-child {
      border-bottom: none;
    }
  `,
  InfoBox: styled.div`
    .hotel {
      font-size: 15px;
      padding-bottom: 3px;
      font-weight: 500;
      color: ${(props) => props.theme.colors.black300};
    }
    .title {
      font-size: 14px;
      color: ${(props) => props.theme.colors.black500};
      &:hover {
        cursor: pointer;
        text-decoration: underline;
        color: ${(props) => props.theme.colors.black300};
      }
    }
  `,
  DateBox: styled.div`
    display: flex;
    font-size: 12px;
    margin-top: 20px;
    color: ${(props) => props.theme.colors.gray600};
    .apply {
      display: flex;
      &__value {
        padding-right: 4px;
      }
    }
    .cancel {
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.colors.gray600};
      &::before {
        content: '';
        display: inline-block;
        width: 1px;
        height: 10px;
        background-color: ${(props) => props.theme.colors.gray200};
        margin: 0 10px;
      }
      &__value {
        padding-right: 4px;
      }
    }
  `,
};
