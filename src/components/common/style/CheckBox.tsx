import styled from "styled-components";

interface CheckBoxProps {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckBox({ label, onChange }: CheckBoxProps) {
  return (
    <S.CheckBox>
      <div className="box">
        <input type="checkbox" onChange={onChange} />
        <label htmlFor="custom-checkbox">{label}</label>
      </div>
      <i>icon</i>
    </S.CheckBox>
  );
}

const S = {
  CheckBox: styled.div`
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .box {
      border: 1px solid #000;
    }
  `,
};
