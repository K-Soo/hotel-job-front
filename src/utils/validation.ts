import * as yup from 'yup';
import { regex } from './regex';
import { BLACKLISTED_NAMES } from '@/constants/blacklist';

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
// const MORE_File = (more: number) => `${more}개 이상 등록해주세요.`;
// const LESS_File = (less: number) => `${less}개까지 등록 가능합니다.`;

const EMAIL_VALID_TEXT = '이메일 형식을 확인해주세요';
const KO_VALID_TEXT = '한글만 입력가능합니다.';
const KO_VALID_TEXT_1 = '모음 입력제한';
const KO_VALID_TEXT_2 = '자음 입력제한';
const SPACES_VALID_TEXT = '공백 불가';
const FIRST_SPACES_VALID_TEXT = '앞 공백 있음';
const LAST_SPACES_VALID_TEXT = '뒤 공백 있음';
// const SPECIAL_VALID_TEXT_1 = '특수문자는 허용되지않습니다';
// const NUMBER_VALID_TEXT = '숫자만 입력 가능합니다.';

const SPACES_VALID_TEXT_1 = '공백';

export const validation = {
  USER_ID: yup
    .string()
    .required()
    .test('no-repeated-chars', '연속된 동일 문자를 사용할 수 없습니다.', (value) => {
      if (!value) return false;
      return !/(.)\1{2,}/.test(value);
    })
    .test('no-forbidden-words', '사용할 수 없는 아이디입니다.', (value) => {
      if (!value) return false;
      return !BLACKLISTED_NAMES.some((word) => value.toLowerCase().includes(word));
    })
    .matches(regex.userId, '8~16자의 영문 소문자 및 숫자 조합'),

  PASSWORD: yup.string().required().matches(regex.password, '비밀번호 형식을 확인해주세요.'),
  PASSWORD_CONFIRM: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지않습니다.'),
  NEW_PASSWORD_CONFIRM: yup
    .string()
    .required()
    .oneOf([yup.ref('newPassword')], '비밀번호가 일치하지않습니다.'),
  PHONE: yup.string().required().matches(regex.phone, '010으로 시작하는 "-"를 제외한 숫자'),
  NICKNAME: yup
    .string()
    .required()
    .matches(regex.FIRST_SPACE, FIRST_SPACES_VALID_TEXT)
    .matches(regex.LAST_SPACE, LAST_SPACES_VALID_TEXT)
    .matches(regex.allSpace, SPACES_VALID_TEXT)
    .matches(regex.NICKNAME, '한글, 영문, 숫자로만 이루어져야 하며 특수문자와 공백은 포함할 수 없습니다.'),
  REQUIRED_EMAIL: () =>
    yup
      .string()
      .required()
      .email(EMAIL_VALID_TEXT)
      .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, '유효한 이메일을 입력해주세요.')
      .matches(regex.FIRST_SPACE, FIRST_SPACES_VALID_TEXT)
      .matches(regex.LAST_SPACE, LAST_SPACES_VALID_TEXT)
      .min(5, MORE_TEXT(5))
      .max(40, LESS_TEXT(40)),
  //필수 - 앞뒤 공백체크
  REQUIRED_TEXT_1: ({ minLength, maxLength }: { minLength: number; maxLength: number }) =>
    yup
      .string()
      .required()
      .matches(regex.FIRST_SPACE, FIRST_SPACES_VALID_TEXT)
      .matches(regex.LAST_SPACE, LAST_SPACES_VALID_TEXT)
      .min(minLength, MORE_TEXT(minLength))
      .max(maxLength, LESS_TEXT(maxLength)),
  //필수 - 공백불가, 한글만가능
  REQUIRED_TEXT_2: ({ minLength, maxLength }: { minLength: number; maxLength: number }) =>
    yup
      .string()
      .required()
      .matches(regex.allSpace, SPACES_VALID_TEXT_1)
      .matches(regex.gather, KO_VALID_TEXT_1)
      .matches(regex.consonant, KO_VALID_TEXT_2)
      .matches(regex.korean, KO_VALID_TEXT)
      .min(minLength, MORE_TEXT(minLength))
      .max(maxLength, LESS_TEXT(maxLength)),
  //필수 - 앞뒤 공백체크
  TEXT_1: ({ minLength, maxLength }: { minLength: number; maxLength: number }) =>
    yup
      .string()
      .matches(regex.FIRST_SPACE, FIRST_SPACES_VALID_TEXT)
      .matches(regex.LAST_SPACE, LAST_SPACES_VALID_TEXT)
      .min(minLength, MORE_TEXT(minLength))
      .max(maxLength, LESS_TEXT(maxLength)),
};
