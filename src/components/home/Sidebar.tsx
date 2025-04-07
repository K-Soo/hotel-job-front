import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import path from '@/constants/path';
import Icon from '@/icons/Icon';
import { motion } from 'framer-motion';

interface SidebarProps {
  active: string;
}

const sections = [
  { id: 'premium-recruit', label: '프리미엄' },
  { id: 'special-recruit', label: '스페셜' },
  { id: 'urgent-recruit', label: '급구' },
  { id: 'basic-recruit', label: '기본' },
];

export default function Sidebar({ active }: SidebarProps) {
  const router = useRouter();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -250;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <S.Sidebar className="hidden lg:flex">
      <S.RecruitProduct whileHover={{ y: -2 }} whileTap={{ y: 0 }} onClick={() => router.push(path.EMPLOYER_PRODUCT_RECRUITMENT)}>
        <Icon name="ShopB24x24" width="34px" height="34px" margin="0 0 10px 0" />
        <button>채용 상품</button>
      </S.RecruitProduct>

      <S.Progress>
        {sections.map(({ id, label }) => (
          <S.MenuItem key={id} $active={active === id} onClick={() => scrollTo(id)}>
            {label}
          </S.MenuItem>
        ))}
      </S.Progress>
    </S.Sidebar>
  );
}

const S = {
  Sidebar: styled.div`
    position: absolute;
    top: 105px;
    left: calc(50% + 512px + 30px);
    flex-direction: column;
    height: 100%;
    width: auto;
  `,
  RecruitProduct: styled(motion.div)`
    position: sticky;
    top: 100px;
    height: 100px;
    width: 80px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.blue600};
  `,
  Progress: styled.div`
    position: sticky;
    top: 200px;
  `,
  MenuItem: styled.div<{ $active: boolean }>`
    position: relative;
    padding-left: 20px;
    margin: 24px 0;
    color: ${({ $active }) => ($active ? '#3B82F6' : '#999')};
    font-weight: ${({ $active }) => ($active ? '700' : '400')};
    cursor: pointer;
    font-size: 13px;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: ${({ $active }) => ($active ? '#3B82F6' : '#ccc')};
      z-index: 2;
    }

    &::after {
      content: '';
      position: absolute;
      left: 3.5px;
      top: 12px;
      width: 1px;
      height: calc(100% - 14px);
      background-color: #ccc;
      z-index: 1;
      height: 30px;
    }

    &:last-child::after {
      display: none;
    }
  `,
};
