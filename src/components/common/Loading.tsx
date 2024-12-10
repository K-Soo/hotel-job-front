import React from "react";
import styled from "styled-components";
import Image from "next/image";

interface LoadingProps {
  height?: string;
}

export default function Loading({ height }: LoadingProps) {
  React.useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <S.Loading height={height}>
      <Image src="/images/spinner200px.gif" width={30} height={30} alt="loading" priority />
    </S.Loading>
  );
}

const S = {
  Loading: styled.div<{ height?: string }>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
    height: ${({ height }) => height || "100%"};
    z-index: 15;
  `,
};
