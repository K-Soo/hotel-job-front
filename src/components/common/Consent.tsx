import styled from 'styled-components';
import Radio from '@/components/common/style/Radio';
import CheckBox from '@/components/common/style/CheckBox';

interface ConsentProps {}

export default function Consent({}: ConsentProps) {
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    console.log('name: ', name);
    console.log('checked: ', checked);
  };

  return (
    <S.Consent>
      <CheckBox name="allAgree" onChange={handleChangeCheckbox} label="전체 동의" margin="5px" />
      <CheckBox name="personalInfoAgree" onChange={handleChangeCheckbox} label="서비스이용 동의" margin="5px" />
      <CheckBox name="serviceTermsAgree" onChange={handleChangeCheckbox} label="개인정보 수집동의" margin="5px" />
      <CheckBox name="marketingAgree" onChange={handleChangeCheckbox} label="마케팅 동의" margin="5px" />
    </S.Consent>
  );
}

const S = {
  Consent: styled.div``,
};
