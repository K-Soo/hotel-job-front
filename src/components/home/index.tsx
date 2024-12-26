import styled from 'styled-components';
import { useRouter } from 'next/router';

interface HomeProps {
  children: React.ReactNode;
}

export default function Home({ children }: HomeProps) {
  const router = useRouter();

  return (
    <S.Home>
      {children}
      {/* <button onClick={() => router.push('/test')}>test</button> */}
    </S.Home>
  );
}

const S = {
  Home: styled.section``,
};
