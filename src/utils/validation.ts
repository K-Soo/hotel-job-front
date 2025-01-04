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
const KO_VALID_TEXT = '한글만 입력가능합니다.';
const KO_VALID_TEXT_1 = '모음 입력제한';
const KO_VALID_TEXT_2 = '자음 입력제한';
const FIRST_SPACES_VALID_TEXT = '앞 공백 있음';
const LAST_SPACES_VALID_TEXT = '뒤 공백 있음';
const SPECIAL_VALID_TEXT_1 = '특수문자는 허용되지않습니다';
const NUMBER_VALID_TEXT = '숫자만 입력 가능합니다.';

const SPACES_VALID_TEXT_1 = '공백불가';

export const validation = {
  USER_ID: yup
    .string()
    .required()
    .min(8, MORE_TEXT(8))
    .max(16, LESS_TEXT(16))
    .matches(regex.FIRST_SPACE, FIRST_SPACES_VALID_TEXT)
    .matches(regex.LAST_SPACE, LAST_SPACES_VALID_TEXT)
    .matches(regex.userId, '소문자 + 숫자만 입력가능합니다.'),
  PASSWORD: yup.string().required().matches(regex.password, '비밀번호 형식을 확인해주세요.'),
  PASSWORD_CONFIRM: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지않습니다.'),
  PHONE: yup.string().required().matches(regex.phone, '010으로 시작하는 "-"를 제외한 숫자'),
  REQUIRED_EMAIL: () =>
    yup
      .string()
      .required()
      .email(EMAIL_VALID_TEXT)
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
      .matches(regex.gather, KO_VALID_TEXT_1)
      .matches(regex.consonant, KO_VALID_TEXT_2)
      .matches(regex.korean, KO_VALID_TEXT)
      .matches(regex.allSpace, SPACES_VALID_TEXT_1)
      .min(minLength, MORE_TEXT(minLength))
      .max(maxLength, LESS_TEXT(maxLength)),
};
