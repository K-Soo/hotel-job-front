import { ApplicationHistory } from '@/types';
import styled from 'styled-components';
import { dateFormat } from '@/utils';
import { APPLICATION_STATUS } from '@/constants/application';
import { phoneNumberFormat } from '@/utils';

interface ApplicationDetailFormProps {
  selectedApplicant: ApplicationHistory;
}

export default function ApplicationDetailForm({ selectedApplicant }: ApplicationDetailFormProps) {
  return (
    <S.ApplicationDetailForm>
      <S.CompanyInfo>
        <div className="hotel">{selectedApplicant.recruitmentSnapshot.hotelName}</div>
        <div className="title">{selectedApplicant.recruitmentSnapshot.title}</div>
      </S.CompanyInfo>

      <div>
        <S.ContentItem>
          <span className="title">이름</span>
          <div className="value">{selectedApplicant.resumeSnapshot.name}</div>
        </S.ContentItem>

        <S.ContentItem>
          <span className="title">연락처</span>
          <div>{phoneNumberFormat(selectedApplicant.resumeSnapshot.phone)}</div>
        </S.ContentItem>

        <S.ContentItem>
          <span className="title">이력서</span>
          <div>{selectedApplicant.resumeSnapshot.title}</div>
          {selectedApplicant.resumeSnapshot.isDefault && <StyledDefaultResume>기본</StyledDefaultResume>}
        </S.ContentItem>

        <S.ContentItem>
          <span className="title">지원상태</span>

          <div className="date-box">
            <span className="date-box__value">{dateFormat.date(selectedApplicant.applyAt, 'YY.MM.DD')}</span>
            <span>접수</span>
          </div>

          {selectedApplicant.cancelAt !== null && (
            <div className="date-box cancel">
              {selectedApplicant.cancelAt !== null && (
                <span className="date-box__value">{dateFormat.date(selectedApplicant.cancelAt, 'YY.MM.DD')}</span>
              )}
              <span>지원취소</span>
            </div>
          )}
        </S.ContentItem>

        <S.ContentItem>
          <span className="title">열람여부</span>
          <div>{selectedApplicant.isView ? '열람' : '미열람'}</div>
        </S.ContentItem>
      </div>
    </S.ApplicationDetailForm>
  );
}

const StyledDefaultResume = styled.span`
  margin-left: 10px;
  background-color: ${({ theme }) => theme.colors.blue100};
  border-radius: 4px;
  padding: 3px 5px;
  color: ${({ theme }) => theme.colors.blue400};
  font-size: 12px;
  font-weight: 300;
`;

const S = {
  ApplicationDetailForm: styled.div`
    margin: 15px;
  `,
  CompanyInfo: styled.div`
    margin-bottom: 15px;
    .hotel {
      font-size: 20px;
      margin-bottom: 5px;
    }
    .title {
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray600};
    }
  `,
  ContentItem: styled.div`
    display: flex;
    align-items: center;
    height: 35px;
    font-size: 14px;
    .title {
      min-width: 70px;
      font-size: 13px;
      color: ${({ theme }) => theme.colors.gray600};
    }
    .date-box {
      display: flex;
      justify-content: space-between;
      color: ${({ theme }) => theme.colors.gray700};
      font-weight: 300;
      &__value {
        padding-right: 4px;
      }
    }
    .cancel {
      color: ${({ theme }) => theme.colors.gray600};
      &::before {
        content: '';
        display: flex;
        align-items: center;
        width: 1px;
        background-color: ${({ theme }) => theme.colors.gray500};
        margin: 0 10px;
      }
    }
  `,
};
