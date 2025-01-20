import styled from 'styled-components';

interface UserProps {
  children: React.ReactNode;
}

export default function User({ children }: UserProps) {
  return (
    <S.User>
      {children}
      <div className="container">
        <div>서머리</div>
        <div>컨텐츠</div>
      </div>
    </S.User>
  );
}

const S = {
  User: styled.section`
    display: flex;
  `,
};
