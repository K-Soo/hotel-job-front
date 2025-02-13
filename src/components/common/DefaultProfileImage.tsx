import styled from 'styled-components';
import Image from 'next/image';

interface DefaultProfileImageProps {
  imageUrl: string;
  margin?: string;
}
// TODO - 이미지 에러 예외처리
export default function DefaultProfileImage({ imageUrl, margin }: DefaultProfileImageProps) {
  return (
    <S.DefaultProfileImage margin={margin}>
      {imageUrl && <Image src={imageUrl} fill alt="profile" />}
      {/* <Image src={'/images/user.png'} fill alt="profile" /> */}
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
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  `,
};
