import styled from 'styled-components';
import DaumPostcode, { Address } from 'react-daum-postcode';
import Background from '@/components/common/Background';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { daumPostAtom } from '@/recoil/daumPost';

interface DaumPostProps {}

export default function DaumPost({}: DaumPostProps) {
  const daumPostAtomValue = useRecoilValue(daumPostAtom);
  const setDaumPostState = useSetRecoilState(daumPostAtom);

  const handleClickClose = () => {
    setDaumPostState({ isOpen: false });
  };

  const handleComplete = (data: Address) => {
    const { address, addressType, bname, buildingName, zonecode } = data;
    let fullAddress = address;
    let extraAddress = '';
    if (addressType === 'R') {
      if (bname !== '') {
        extraAddress += bname;
      }
      if (buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${buildingName}` : buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    // clearErrors(['newZipcode', 'newBasicAddress']);
    // setValue('newZipcode', zonecode);
    // setValue('newBasicAddress', fullAddress);
    // resetDaumPostState();
    // setFocus('newDetailAddress');
  };

  return (
    <Background>
      <S.DaumPost>
        <S.Header>
          <h1>주소 검색</h1>
          <i onClick={handleClickClose}>X</i>
        </S.Header>
        <DaumPostcode
          className="daum"
          onComplete={handleComplete}
          autoClose={true}
          onResize={(size) => {
            console.log('size: ', size);
          }}
          style={{
            height: 'calc(100% - 50px)',
          }}
          onClose={handleClickClose}
          animation={true}
        />
      </S.DaumPost>
    </Background>
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
    /* background-color: red; */
    z-index: 10;
    /* border: 2px solid #000; */
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
  `,
};
