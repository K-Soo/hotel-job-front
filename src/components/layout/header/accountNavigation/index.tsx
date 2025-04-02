import styled from 'styled-components';
import Logo from '@/components/common/Logo';
import { motion } from 'framer-motion';
import path from '@/constants/path';
import { useRouter } from 'next/router';

interface AccountNavigationProps {}

export function AccountNavigation({}: AccountNavigationProps) {
  const router = useRouter();

  return (
    <S.AccountNavigation>
      <Logo size="small" />
      <S.HelpButton
        whileHover={{ border: '1px solid #4593fc', color: '#4593fc' }}
        whileTap={{ scale: 0.99 }}
        onClick={() => router.push(path.HELP__NOTICE)}
      >
        고객센터
      </S.HelpButton>
    </S.AccountNavigation>
  );
}

const S = {
  AccountNavigation: styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1024px;
    margin: 0 auto;
    padding: 0 15px;
  `,
  HelpButton: styled(motion.button)`
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.colors.gray300};
    color: ${(props) => props.theme.colors.blue600};
    height: 32px;
    padding: 0 15px;
    font-size: 14px;
    cursor: pointer;
  `,
};
