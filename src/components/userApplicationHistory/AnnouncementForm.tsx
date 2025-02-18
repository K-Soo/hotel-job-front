import { RESULT_NOTIFICATION_STATUS } from '@/constants/announcement';
import { ApplicationHistory } from '@/types';
import styled from 'styled-components';
import { dateFormat } from '@/utils';

interface AnnouncementFormProps {
  selectedApplication: ApplicationHistory;
}

export default function AnnouncementForm({ selectedApplication }: AnnouncementFormProps) {
  return (
    <S.AnnouncementForm>
      {selectedApplication.announcementRecipients.map((recipient) => (
        <S.AnnouncementFormContent key={recipient.id}>
          <div className="announced-at">{dateFormat.date(recipient.announcedAt, 'YY.MM.DD HH:mm')}</div>
          <div className="status">{RESULT_NOTIFICATION_STATUS[recipient.resultNotificationStatus]}</div>
          <div className="title">{recipient.title}</div>
          {/* <div>{recipient.announcementType}</div> */}
          <textarea className="message" defaultValue={recipient.message} readOnly rows={recipient.message.split('\n').length + 8} />
        </S.AnnouncementFormContent>
      ))}
    </S.AnnouncementForm>
  );
}

const S = {
  AnnouncementForm: styled.div`
    margin: 0 10px;
  `,
  AnnouncementFormContent: styled.div`
    padding-top: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      border-bottom: none;
    }
    .announced-at {
      display: flex;
      justify-content: flex-end;
      font-size: 13px;
      margin-bottom: 15px;
      color: ${({ theme }) => theme.colors.gray800};
    }
    .status {
      font-size: 14px;
      padding-bottom: 4px;
    }
    .title {
      font-size: 18px;
      margin-bottom: 15px;
    }
    .message {
      width: 100%;
      resize: none;
      border: 1px solid ${({ theme }) => theme.colors.gray200};
      padding: 10px 8px;
      border-radius: 5px;
      outline: none;
    }
  `,
};
