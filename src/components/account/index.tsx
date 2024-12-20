import styled from 'styled-components';
import Summary from '@/components/account/Summary';
interface AccountProps {
  children: React.ReactNode;
}

export default function Account({ children }: AccountProps) {
  return (
    <S.Account>
      {children}
      <div className="container">
        <Summary />
        <div>컨텐츠</div>
      </div>
    </S.Account>
  );
}

const S = {
  Account: styled.section`
    display: flex;
    height: 100%;
    ${(props) => props.theme.media.tablet`
      flex-direction: column-reverse;
    `};
    .container {
      width: 100%;
    }
  `,
};
