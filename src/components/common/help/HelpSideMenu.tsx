import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import path from '@/constants/path';

export default function HelpSideMenu() {
  const router = useRouter();

  return (
    <S.HelpSideMenu className="mr-[30px] hidden w-[200px] bg-white md:block">
      <h2 className="mb-5 text-3xl font-semibold">고객센터</h2>

      <div>
        <ul>
          <motion.li
            initial={{ background: '#fff' }}
            whileHover={{ background: '#f5f7fa' }}
            className={`my-1 flex h-[40px] cursor-pointer items-center rounded-[5px] pl-2 font-medium ${router.pathname === path.HELP__NOTICE ? 'text-black-400' : 'text-black-800'}`}
            onClick={() => router.push(path.HELP__NOTICE)}
          >
            공지사항
          </motion.li>

          <motion.li
            initial={{ background: '#fff' }}
            whileHover={{ background: '#f5f7fa' }}
            className={`my-1 flex h-[40px] cursor-pointer items-center rounded-[5px] pl-2 font-medium ${router.pathname === path.HELP__FAQ ? 'text-black-400' : 'text-black-800'}`}
            onClick={() => router.push(path.HELP__FAQ)}
          >
            자주 묻는 질문
          </motion.li>
        </ul>
      </div>
    </S.HelpSideMenu>
  );
}

const S = {
  HelpSideMenu: styled.aside`
    width: 200px;
    margin-right: 30px;
    background-color: ${({ theme }) => theme.colors.white};
  `,
};
