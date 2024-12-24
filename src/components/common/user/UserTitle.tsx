import styled from 'styled-components';

interface UserTitleProps {
  title: string;
}

export default function UserTitle({ title }: UserTitleProps) {
  return (
    <S.UserTitle>
      <h1>{title}</h1>
    </S.UserTitle>
  );
}

const S = {
  UserTitle: styled.div`
    font-weight: 600;
    font-size: 34px;
    color: ${(props) => props.theme.colors.gray800};
    margin-bottom: 15px;
    ${(props) => props.theme.media.tablet`
      display: none;
    `};
  `,
};
