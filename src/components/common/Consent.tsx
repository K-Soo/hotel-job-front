import styled from 'styled-components';
import Radio from '@/components/common/style/Radio';
import CheckBox from '@/components/common/style/CheckBox';

interface ConsentProps {}

export default function Consent({}: ConsentProps) {
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
  };

  return (
    <S.Consent>
      <CheckBox checked={false} name="allAgree" onChange={handleChangeCheckbox} label="전체 동의" margin="5px" />
      <CheckBox checked={false} name="personalInfoAgree" onChange={handleChangeCheckbox} label="서비스이용 동의" margin="5px" />
      <CheckBox checked={false} name="serviceTermsAgree" onChange={handleChangeCheckbox} label="개인정보 수집동의" margin="5px" />
      <CheckBox checked={false} name="marketingAgree" onChange={handleChangeCheckbox} label="마케팅 동의" margin="5px" />
    </S.Consent>
  );
}

const S = {
  Consent: styled.div``,
};
