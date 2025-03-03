import { FailResultNotificationKey, PassResultNotificationKey, ResultNotificationStatusKey } from '@/types';

export const ANNOUNCEMENT_TYPE = {
  ACCEPT: '합격 안내',
  REJECT: '불합격 안내',
};

export const PASS_RESULT_NOTIFICATION_STATUS = {
  DOCUMENT_PASS: '서류전형 합격 면접안내', // 서류 합격
  INTERVIEW_PASS: '면접전형 합격', // 면접 합격
  FINAL_PASS: '최종합격', // 최종 합격
};

export const FAIL_RESULT_NOTIFICATION_STATUS = {
  DOCUMENT_FAIL: '서류전형 불합격', // 서류 불합격
  INTERVIEW_FAIL: '면접전형 불합격', // 면접 불합격
  FAIL: '불합격', //불합격
};

export const RESULT_NOTIFICATION_STATUS = {
  ...PASS_RESULT_NOTIFICATION_STATUS,
  ...FAIL_RESULT_NOTIFICATION_STATUS,
};

export type AnnouncementTypeKey = 'ACCEPT' | 'REJECT';

type AnnouncementMessages = {
  ACCEPT: {
    [key in PassResultNotificationKey]: string;
  };
  REJECT: {
    [key in FailResultNotificationKey]: string;
  };
};

export const ANNOUNCEMENT_MESSAGE: AnnouncementMessages = {
  ACCEPT: {
    DOCUMENT_PASS: [
      `$이름$님, 안녕하세요. $업체명$ 채용담당자 입니다.`,
      `먼저 당사의 ‘$공고명$’에 지원하여 주신 점 감사합니다.`,
      `심사 결과 서류전형에 합격하셨음을 알려드립니다. 진심으로 축하 드립니다.`,
      ``,
      `다음 전형에 대해서 안내드리오니 아래 사항을 반드시 확인해 주시기 바랍니다.`,
      ``,
      `면접 전형 안내`,
      `ㆍ면접일시 : 0000년 00월 00일 (0요일) 00시`,
      `ㆍ면접장소 : `,
      `ㆍ준비사항 : `,
      `ㆍ담당자 : `,
      ``,
      `일정 조정이 필요하거나 불참하는 경우 위 담당자에게 연락해 주시기 바랍니다.`,
      ``,
      `그럼, 좋은 결과 있으시길 바랍니다.`,
      `감사합니다.`,
    ].join('\n'),

    INTERVIEW_PASS: [
      `$이름$님, 안녕하세요.`,
      `$업체명$ 채용담당자 입니다.`,
      `먼저 당사의 ‘$공고명$’ 면접 전형에 참여해 주셔서 감사합니다.`,
      `심사 결과 면접 전형에 합격하셨음을 알려드립니다.`,
      `진심으로 축하드립니다.`,
      ``,
      `최종 합격 여부는 면접 평가가 완료된 후 개별 안내드릴 예정입니다.`,
      `결과 발표 일정은 결과발표일에 연락처 또는 이메일로 안내드릴 예정이오니 참고 부탁드립니다.`,
      ``,
      `기다리는 동안 궁금하신 사항이 있으시면 담당자($담당자$)에게 문의해 주세요.`,
      ``,
      `좋은 결과로 다시 안내드릴 수 있도록 최선을 다하겠습니다.`,
      `감사합니다.`,
    ].join('\n'),

    FINAL_PASS: [
      `$이름$님, 안녕하세요.`,
      `$업체명$ 채용 담당자입니다.`,
      `먼저 당사의 ‘$공고명$’ 채용에 참여해 주셔서 감사합니다.`,
      `면접 전형 결과, 최종 합격하셨음을 알려드립니다.`,
      `진심으로 축하 드립니다! 🎉`,
      ``,
      `입사 관련 절차를 안내드리오니 아래 내용을 확인해 주세요.`,
      ``,
      `입사 일정`,
      `ㆍ입사일 : 0000년 00월 00일 (0요일)`,
      `ㆍ업체주소 : $업체주소$`,
      `ㆍ제출서류 : `,
      `ㆍ담당자 연락처: $담당자 연락처$`,
      ``,
      `추후 입사 관련하여 궁금하신 사항이 있으시면 담당자에게 문의해 주세요.`,
      ``,
      `귀하의 합격을 다시 한번 축하드리며, 함께할 날을 기대하겠습니다.`,
      `감사합니다.`,
    ].join('\n'),
  },
  REJECT: {
    DOCUMENT_FAIL: [
      `$이름$님, 안녕하세요. $업체명$ 채용 담당자입니다.`,
      `먼저 당사의 ‘$공고명$’에 지원하여 주신 점 감사합니다.`,
      `아쉽게도 서류전형에서 합격이 어렵게 되었습니다.`,
      ``,
      `지원해 주신 소중한 이력서는 꼼꼼히 검토하였으며,`,
      `앞으로 더 좋은 기회로 다시 만나 뵙길 기대합니다.`,
      ``,
      `귀하의 앞날에 좋은 기회가 가득하길 바랍니다.`,
      ``,
      `감사합니다.`,
    ].join('\n'),
    INTERVIEW_FAIL: [
      `$이름$님, 안녕하세요. $업체명$ 채용담당자 입니다.`,
      `먼저 당사의 ‘$공고명$’ 면접 전형에 참여해 주셔서 감사합니다.`,
      `아쉽게도 이번 면접 전형에서는 합격이 어렵게 되었습니다.`,
      ``,
      `많은 지원자들과의 경쟁 속에서 신중하게 평가한 결과,`,
      `현재 포지션과의 적합도를 고려하여 최종 합격이 어려운 점 양해 부탁드립니다.`,
      ``,
      `앞으로 더 좋은 기회로 다시 만나 뵙길 기대하며,`,
      `귀하의 앞날에 좋은 일만 가득하길 기원합니다.`,
      ``,
      `감사합니다.`,
    ].join('\n'),

    FAIL: [
      `$이름$님, 안녕하세요. $업체명$ 채용담당자 입니다.`,
      `먼저 당사의 ‘$공고명$’ 최종 전형까지 참여해 주셔서 감사합니다.`,
      `아쉽게도 이번 채용에서는 합격이 어렵게 되었습니다.`,
      ``,
      `귀하의 뛰어난 역량에도 불구하고, 최종 결정 과정에서 어려운 선택을 해야 했습니다.`,
      `앞으로 더 좋은 기회로 다시 만나 뵙길 기대합니다.`,
      ``,
      `귀하의 앞날에 성공과 행운이 가득하길 바랍니다.`,
      ``,
      `감사합니다.`,
    ].join('\n'),
  },
};
