import styled from 'styled-components';
import { useRouter } from 'next/router';
import path from '@/constants/path';

export default function HelpSectionTab() {
  const router = useRouter();

  return (
    <article className="mb-4 flex h-[40px] md:hidden">
      <S.Item className="mr-4" onClick={() => router.replace(path.HELP__NOTICE)} $active={router.pathname === path.HELP__NOTICE}>
        공지사항
      </S.Item>
      <S.Item onClick={() => router.replace(path.HELP__FAQ)} $active={router.pathname === path.HELP__FAQ}>
        자주 묻는 질문
      </S.Item>
    </article>
  );
}

const S = {
  Item: styled.button<{ $active: boolean }>`
    background-color: ${({ $active, theme }) => ($active ? theme.colors.blue400 : theme.colors.gray300)};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
    border-radius: 8px;
    font-size: 16px;
    color: #ffffff;
    cursor: pointer;
  `,
};
