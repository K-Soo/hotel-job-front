import styled from 'styled-components';
import Image from 'next/image';

interface DefaultProfileImageProps {
  imageUrl: string;
  margin?: string;
}

export default function DefaultProfileImage({ imageUrl, margin }: DefaultProfileImageProps) {
  return (
    <S.DefaultProfileImage margin={margin}>
      {/* <Image src={imageUrl} fill alt="profile" /> */}
      <Image src={'/images/user.png'} fill alt="profile" />
    </S.DefaultProfileImage>
  );
}

const S = {
  DefaultProfileImage: styled.div<{ margin?: string }>`
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin: ${({ margin }) => margin};
    border: 1px solid red;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  `,
};
