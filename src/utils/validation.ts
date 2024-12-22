import * as yup from 'yup';
import { regex } from './regex';

yup.setLocale({
  mixed: {
    required: '필수 입력',
    oneOf: '필수 선택',
  },
  number: {
    positive: '양수값을 입력해주세요',
    max: '999이하로 입력해주세요',
    min: '1이상 입력해주세요',
  },
});

const MORE_TEXT = (more: number) => `${more}자 이상`;
const LESS_TEXT = (less: number) => `${less}자 이하`;
const MORE_File = (more: number) => `${more}개 이상 등록해주세요.`;
const LESS_File = (less: number) => `${less}개까지 등록 가능합니다.`;

const EMAIL_VALID_TEXT = '이메일 형식을 확인해주세요';
const KO_VALID_TEXT = '한글만 입력가능합니다(자음,모음 제외)';
const KO_VALID_TEXT_1 = '모음 입력제한';
const KO_VALID_TEXT_2 = '자음 입력제한';
const KO_VALID_TEXT_3 = '한글은 허용되지않습니다';
const KO_VALID_TEXT_4 = '한글입력만 허용됩니다';
const FIRST_SPACES_VALID_TEXT = '첫글자 공백';
const LAST_SPACES_VALID_TEXT = '마지막글자 공백';
const SPECIAL_VALID_TEXT_1 = '특수문자는 허용되지않습니다';
const NUMBER_VALID_TEXT = '숫자만 입력 가능합니다.';

export const validation = {
  USER_ID: yup.string().required().matches(regex.userId, '아이디를 형식을 확인해주세요.'),
  PASSWORD: yup.string().required().matches(regex.password, '비밀번호 형식을 확인해주세요.'),
  PASSWORD_CONFIRM: yup.string().required(),
};
