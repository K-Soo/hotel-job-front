import styled from "styled-components";

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  name: "neutral" | "warning" | "positive" | "positiveWhite";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fontSize?: string;
  margin?: string;
  height?: string;
  width?: string;
  borderRadius?: string;
}

export default function Button({ label, margin, onClick, fontSize, type, disabled, height, name, width, borderRadius }: ButtonProps) {
  return (
    <S.Button
      type={type ?? "button"}
      onClick={onClick}
      height={height}
      name={name}
      width={width}
      margin={margin}
      fontSize={fontSize}
      disabled={disabled}
      $borderRadius={borderRadius}
    >
      {label}
    </S.Button>
  );
}

const S = {
  Button: styled.button<{
    margin?: string;
    width?: string;
    height?: string;
    fontSize?: string;
    name?: string;
    $borderRadius?: string;
  }>`
    cursor: pointer;
    margin: ${(props) => (props.margin ? props.margin : "0")};
    width: ${(props) => (props.width ? props.width : "100%")};
    height: ${(props) => (props.height ? props.height : "35px")};
    border-radius: ${(props) => (props.$borderRadius ? props.$borderRadius : "0")};
    border: 1px solid #000000;
    text-align: center;
    background-color: hsla(0, 0%, 9%, 1);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 6px;
    border-radius: 5px;
    font-size: 14px;
    ${(props) =>
      props.name === "positiveWhite" &&
      `
        color: #555;
        border: 1px solid #ebebeb;
        border-bottom-color: #c6c6c6;
        box-shadow: 0 0 2px 1px rgba(0,0,0,0.04);
        text-shadow: 0 0 5px rgba(255,255,255,1);
        background: #fff;
        background: linear-gradient(to bottom,#ffffff 40%,#f6f6f6 100%);
        :hover{
          background: linear-gradient(to bottom,#ffffff 100%,#f6f6f6 100%);
        }
        &:disabled {
          background: #d9d9d9;
          color: #fff;
          text-shadow: none;
          box-shadow: none;
          border: none;
        }
    `};

    ${(props) =>
      props.name === "positive" &&
      `
    }
    `};
  `,
};
