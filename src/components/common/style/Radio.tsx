import styled from "styled-components";

interface RadioProps {
  name: string;
  id: string;
  value: string;
  margin?: string;
  onChange: (value: string) => void;
}

export default function Radio({ id, name, onChange, value, margin }: RadioProps) {
  return (
    <S.Radio>
      <input id={`${id}-radio`} type="radio" onChange={(event) => onChange(event.target.value)} name={name} value={value} />
      <label htmlFor={`${id}-radio`}>라벨</label>
    </S.Radio>
  );
}

const S = {
  Radio: styled.div`
    box-sizing: border-box;
    label {
    }
  `,
};
