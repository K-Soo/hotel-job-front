import { RecruitmentDetailApplicantListItem } from '@/types';
import { dateFormat } from '@/utils';
import styled from 'styled-components';

interface DateBodyRowProps {
  item: RecruitmentDetailApplicantListItem;
}

export default function DateBodyRow({ item }: DateBodyRowProps) {
  return (
    <S.DateBodyRow>
      {!item.cancelAt && <span className="apply-date">{dateFormat.date(item.applyAt, 'YY.MM.DD')}</span>}
      {item.cancelAt && <S.CancelText>지원취소</S.CancelText>}
      {item.isView && <span>열람</span>}
      {!item.isView && <span style={{ color: '#4593fc' }}>미열람</span>}
    </S.DateBodyRow>
  );
}

const S = {
  DateBodyRow: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-basis: 10%;
    height: 100%;
    font-size: 12px;
    color: ${(props) => props.theme.colors.gray900};
    font-weight: 300;
    .apply-date {
      color: ${(props) => props.theme.colors.black300};
      padding-bottom: 5px;
    }
  `,
  CancelText: styled.span`
    font-size: 13px;
    color: ${(props) => props.theme.colors.red500};
    padding-bottom: 5px;
  `,
};
