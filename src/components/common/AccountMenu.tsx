import styled from 'styled-components';
import { motion } from 'framer-motion';
import React from 'react';
import Icon from '@/icons/Icon';
import useAppRouter from '@/hooks/useAppRouter';
import path from '@/constants/path';

interface AccountMenuProps {}

const GENERAL_USER_MENU = [
  { label: 'MY홈', value: '/account', items: [] },
  {
    label: '회원정보',
    value: '',
    items: [
      { label: '회원정보 수정', value: '/account/profile' },
      { label: '메일 수신 설정', value: '/account/email' },
    ],
  },
  {
    label: '이력서',
    value: '/resume',
    items: [
      { label: '이력서 목록', value: '/account/resume' },
      { label: '이력서 등록', value: path.ACCOUNT_RESUME_REGISTER },
    ],
  },
  { label: '스크랩', value: '/account/scrap', items: [] },
  { label: '받은제안', value: '/account/offers', items: [] },
  { label: '결제내역', value: '/account/payments', items: [] },
];

const BUSINESS_USER_MENU = [
  { label: 'MY홈', value: '', items: [] },

  {
    label: '회원정보',
    value: '',
    items: [
      { label: '회원정보 수정', value: '/account/profile' },
      { label: '메일 수신 설정', value: '/account/email' },
    ],
  },

  {
    label: '채용',
    value: '/resume',
    items: [
      { label: '채용 등록', value: '/account/' },
      { label: '이력서 등록', value: '/account/' },
    ],
  },

  { label: '결제내역', value: '', items: [] },
];

export default function AccountMenu({}: AccountMenuProps) {
  const [isOpen, setIsOpen] = React.useState<string | null>(null);
  const appRouter = useAppRouter();

  const handleClickMenu = () => {};

  const handleClickItem = (value: string) => {
    appRouter.push(value);
  };

  return (
    <S.AccountMenu>
      {GENERAL_USER_MENU.map((element) => {
        return (
          <S.Menu key={element.label}>
            <div className="content" onClick={() => setIsOpen((prev) => (prev === element.value ? null : element.value))}>
              <h6>{element.label}</h6>
              {element.items.length !== 0 && <i>아</i>}
            </div>
            {isOpen === element.value && (
              <>
                {element.items.map((item) => (
                  <S.Item key={item.value} onClick={() => handleClickItem(item.value)}>
                    {item.label}
                  </S.Item>
                ))}
              </>
            )}
          </S.Menu>
        );
      })}
    </S.AccountMenu>
  );
}

const S = {
  AccountMenu: styled.div`
    max-width: 200px;
    width: 100%;
    padding: 15px 0;
    margin-right: 30px;
    font-size: 14px;
  `,
  Menu: styled.div`
    margin-bottom: 15px;
    border-bottom: 1px solid #999;
    .content {
      min-height: 40px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding: 0 10px;
      cursor: pointer;
      border-radius: 5px;
      &:hover {
        background-color: #fafafa;
      }
    }
  `,
  Item: styled.div`
    height: 40px;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 0 10px;
    background-color: #fafafa;
    display: flex;
    align-items: center;
    cursor: pointer;
  `,
};
