import styled from 'styled-components';

interface ChoiceDeviceFilterProps {
  margin?: string;
}

export default function ChoiceDeviceFilter({ margin }: ChoiceDeviceFilterProps) {
  return <S.ChoiceDeviceFilter $margin={margin}>ChoiceDeviceFilter</S.ChoiceDeviceFilter>;
}

const S = {
  ChoiceDeviceFilter: styled.div<{ $margin?: string }>`
    margin: ${(props) => props.$margin || '0'};
    height: 40px;
    border: 1px solid red;
  `,
};
