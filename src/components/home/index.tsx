import styled from 'styled-components';
import { useRouter } from 'next/router';

interface HomeProps {}

export default function Home({}: HomeProps) {
  const router = useRouter();

  return (
    <S.Home>
      Home
      {/* <button onClick={() => router.push('/test')}>test</button> */}
    </S.Home>
  );
}

const S = {
  Home: styled.section``,
};
