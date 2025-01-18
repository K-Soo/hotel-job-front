import styled from 'styled-components';

interface ProfileTitleProps {
  title: string;
}

export default function ProfileTitle({ title }: ProfileTitleProps) {
  return <S.ProfileTitle>{title}</S.ProfileTitle>;
}

const S = {
  ProfileTitle: styled.h3`
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 20px;
    color: ${(props) => props.theme.colors.black200};
  `,
};
