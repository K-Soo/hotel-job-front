import { NotificationListItem } from '@/types';
import styled from 'styled-components';
import { dateFormat } from '@/utils';
import { CATEGORY_TYPE } from '@/constants/notification';

interface NotificationItemProps {
  item: NotificationListItem;
  handleClickNotification: (link: string) => void;
}

export default function NotificationItem({ item, handleClickNotification }: NotificationItemProps) {
  return (
    <S.NotificationItem onClick={() => handleClickNotification(item.link)}>
      <div className="item-container">
        <S.Content>
          <span className="category">{CATEGORY_TYPE[item.category]}</span>
          {item.title && <h6 className="title">{item.title}</h6>}
          <p className="message">{item.message}</p>
        </S.Content>
        <div className="date">{dateFormat.date(item.createdAt, 'YY.MM.DD HH:mm')}</div>
      </div>
    </S.NotificationItem>
  );
}

const S = {
  NotificationItem: styled.div`
    min-height: 140px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray100};
    cursor: pointer;
    overflow: hidden;
    .item-container {
      display: flex;
      flex-direction: column;
      padding: 20px 24px;
      border-radius: 10px;
      &:hover {
        background-color: ${(props) => props.theme.colors.gray};
      }
    }
    .category {
      display: inline-block;
      font-size: 12px;
      color: ${(props) => props.theme.colors.blue500};
      margin-bottom: 12px;
      font-weight: 500;
    }
    .title {
      font-size: 14px;
      color: ${(props) => props.theme.colors.black};
      margin-bottom: 2px;
    }
    .message {
      font-size: 14px;
      line-height: 1.4;
      color: ${(props) => props.theme.colors.black};
      word-break: break-all;
    }

    .date {
      margin-top: 12px;
      font-size: 11px;
      color: ${(props) => props.theme.colors.gray500};
    }
  `,
  Content: styled.div`
    flex: 1;
  `,
};
