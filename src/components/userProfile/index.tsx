import styled from 'styled-components';
import UserAsideMenu from '@/components/common/user/UserAsideMenu';

interface UserProfileProps {
  children: React.ReactNode;
}

export default function UserProfile({ children }: UserProfileProps) {
  return (
    <S.UserProfile>
      <UserAsideMenu />
      {children}
      <div>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
        <p>asdasdasdsadasdasd</p>
      </div>
    </S.UserProfile>
  );
}

const S = {
  UserProfile: styled.section`
    display: flex;
  `,
};
