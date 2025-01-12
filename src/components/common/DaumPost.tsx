import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import DaumPostcode, { Address } from 'react-daum-postcode';
import Background from '@/components/common/Background';
import { daumPostAtom } from '@/recoil/daumPost';
import Portal from '@/components/common/Portal';
import Icon from '@/icons/Icon';

interface DaumPostProps {
  addressName?: string;
  addressDetailName?: string;
}

export default function DaumPost({ addressName = 'address', addressDetailName = 'addressDetail' }: DaumPostProps) {
  const { setValue, setFocus } = useFormContext();

  const setDaumPostState = useSetRecoilState(daumPostAtom);
  const resetDaumPostAtom = useResetRecoilState(daumPostAtom);

  const handleComplete = (data: Address) => {
    const { address, addressType, buildingName, zonecode, jibunAddress } = data;

    let fullAddress = address;
    let extraAddress = '';

    if (addressType === 'R') {
      if (buildingName !== '') {
        extraAddress = buildingName;
      }
      if (extraAddress !== '') {
        fullAddress += ` (${extraAddress})`;
      }
    }

    if (addressType === 'J') {
      fullAddress = jibunAddress;
    }
    setValue(addressName, fullAddress);
    setFocus(addressDetailName);
    resetDaumPostAtom();
  };

  return (
    <Portal>
      <Background onClick={() => setDaumPostState({ isOpen: false })}>
        <S.DaumPost>
          <S.Header>
            <h1>주소 검색</h1>
            <Icon name="CloseA24x24" width="24px" height="24px" onClick={() => setDaumPostState({ isOpen: false })} />
          </S.Header>
          <DaumPostcode
            className="daum"
            onComplete={handleComplete}
            autoClose={false}
            style={{
              height: 'calc(100% - 50px)',
            }}
            onClose={() => setDaumPostState({ isOpen: false })}
            animation={false}
          />
        </S.DaumPost>
      </Background>
    </Portal>
  );
}

const S = {
  DaumPost: styled.div`
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translate(-50%);
    max-width: 500px;
    height: 600px;
    width: 100%;
    z-index: 10;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.3);
    .daum {
      height: auto;
    }
    ${(props) => props.theme.media.tablet``};
    ${(props) => props.theme.media.mobile`
      top: 15px;
      width: 95%;
      height: 95%;
    `};
  `,
  Header: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 15px;
    background-color: ${(props) => props.theme.colors.white};
    font-size: 18px;
  `,
};
