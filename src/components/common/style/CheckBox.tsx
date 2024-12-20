import styled from 'styled-components';

interface CheckBoxProps {
  label: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  visibleIcon?: boolean;
  margin?: string;
  checked: boolean;
}

export default function CheckBox({ label, name, onChange, checked, visibleIcon, margin }: CheckBoxProps) {
  return (
    <S.CheckBox $margin={margin}>
      <div className="box">
        <input id={`checkbox-${name}`} type="checkbox" onChange={onChange} name={name} checked={checked} />
        <label htmlFor={`checkbox-${name}`}>{label}</label>
      </div>
      {visibleIcon && <i>icon</i>}
    </S.CheckBox>
  );
}

const S = {
  CheckBox: styled.div<{ $margin?: string }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: ${(props) => props.$margin || 0};
    .box {
      display: flex;
      align-items: center;
    }
  `,
};
