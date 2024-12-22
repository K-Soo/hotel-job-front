export const regex = {
  userId: /^[a-z0-9_-]{5,20}$/,
  password: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, //8자 이상 16자 이하이어야 하며, 대소문자 알파벳, 숫자, 특수문자(@, $, !, %, *, ?, &)를 최소 1개씩 포함
  EMAIL: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
  ALL_SPACE: /^[^\s]*$/,
  FIRST_SPACE: /^\S/, //첫번째글자 공백 체크
  LAST_SPACE: /\S$/, //마지막 글자 공백 체크
  IMAGE_FILE: /^(image\/jpeg|image\/jpg|image\/png|image\/gif)$/, //이미지 파일
};
