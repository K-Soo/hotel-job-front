import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface ResumeProfileImageProps {
  imageUrl: string;
}

export default function ResumeProfileImage({ imageUrl }: ResumeProfileImageProps) {
  const [isImageError, setIsImageError] = React.useState(false);

  React.useEffect(() => {
    setIsImageError(false);
  }, [imageUrl]);

  return (
    <S.ResumeProfileImage>
      {isImageError && <p className="error-text">이미지를 가져올 수 없습니다.</p>}
      {!isImageError && (
        <Image
          src={imageUrl}
          alt="profile"
          fill
          priority
          quality={100}
          onError={() => {
            setIsImageError(true);
          }}
        />
      )}
      <StyledDimmed />
    </S.ResumeProfileImage>
  );
}

const StyledDimmed = styled.div`
  position: absolute;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 100%;
  border-radius: inherit;
`;

const S = {
  ResumeProfileImage: styled.div`
    position: relative;
    width: 100px;
    height: 120px;
    font-size: 0;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    align-items: center;
    .error-text {
      font-size: 12px;
      text-align: center;
      line-height: 1.4;
      word-break: keep-all;
      font-weight: 500;
    }
    img {
      object-fit: cover;
    }
  `,
};
