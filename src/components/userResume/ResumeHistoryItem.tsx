import { ResumeLstItemApplications } from '@/types';
import styled from 'styled-components';
import { dateFormat } from '@/utils';
import { useRouter } from 'next/router';
import useModal from '@/hooks/useModal';

interface ResumeHistoryItemProps {
  item: ResumeLstItemApplications;
}

export default function ResumeHistoryItem({ item }: ResumeHistoryItemProps) {
  const router = useRouter();
  const { setModalAtomState } = useModal();

  return (
    <S.ResumeHistoryItem>
      <div className="info-box">
        <div className="info-box__hotel">{item.recruitment?.hotelName}</div>
        <div
          className="info-box__title"
          onClick={() => {
            router.push(`/recruit/${item.recruitment.id}`);
            setModalAtomState({ isOpen: false });
          }}
        >
          {item.recruitment?.recruitmentTitle}
        </div>
      </div>
      <div className="date-box">
        {item.applyAt && (
          <div className="date-box__apply">
            <span>지원일</span>
            <p>{dateFormat.date(item.applyAt, 'YY.MM.DD HH:mm')}</p>
          </div>
        )}

        {item.cancelAt && (
          <div className="date-box__cancel">
            <p>지원취소</p>
            <p>{dateFormat.date(item.cancelAt, 'YY.MM.DD HH:mm')}</p>
          </div>
        )}
      </div>
    </S.ResumeHistoryItem>
  );
}

const S = {
  ResumeHistoryItem: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
    &:last-child {
      border-bottom: none;
    }
    .info-box {
      &__hotel {
        font-size: 13px;
        padding-bottom: 3px;
        color: ${(props) => props.theme.colors.gray700};
      }
      &__title {
        font-size: 15px;
        color: ${(props) => props.theme.colors.black500};
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
    .date-box {
      font-size: 13px;
      color: ${(props) => props.theme.colors.gray600};
      font-weight: 300;
      white-space: nowrap;
      padding-left: 10px;
      span {
        padding-right: 3px;
      }
      &__apply {
        display: flex;
        align-items: center;
      }
      &___cancel {
        display: flex;
        align-items: center;
        padding-top: 3px;
      }
    }
  `,
};
