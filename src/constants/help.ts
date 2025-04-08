export const HELP_NOTICE = [
  {
    category: '공지',
    title: '호텔잡 신규 오픈 안내',
    content: `안녕하세요.\n호텔업계 구인구직 플랫폼 호텔잡이 새롭게 단장하여 정식 오픈했습니다.

    처음 선보이는 만큼 다소 불편한 점이 있을 수 있지만,
    여러분의 소중한 의견을 바탕으로 꾸준히 개선해 나가겠습니다.
    
    앞으로 인재정보 서비스와 커뮤니티 기능도 순차적으로 추가할 예정이며,
    펜션 업계에서도 활용할 수 있도록 관련 기능도 함께 보완해 나가겠습니다.
    
    빠르게 성장하기보다, 사용자와의 신뢰를 하나하나 쌓아가는 서비스가 되겠습니다.
    앞으로 많은 관심과 응원 부탁드립니다 :)
    
   `,
  },
] as const;

export const HELP_FAQ = [
  {
    category: '공통',
    title: '모바일에서도 앱처럼 사용할 수 있나요?',
    content: `호텔잡은 현재 웹브라우저 기반으로 제공되며
  모바일에서도 홈 화면에 추가하면 앱처럼 편리하게 사용하실 수 있도록 만들어졌어요.
  
  - 안드로이드: 사이트에 접속하면 화면 하단에 '앱 설치 안내'가 자동으로 나타나요. 버튼을 눌러 홈 화면에 쉽게 추가하실 수 있어요.
  - 아이폰: 사파리 브라우저의 공유 버튼을 누른 뒤 '홈 화면에 추가'를 선택하시면 설치가 가능합니다.
  
  또한 알림은 브라우저를 통해 제공되고 있어요.
  더 이상 알림을 받고 싶지 않으실 경우 브라우저의 [설정 > 사이트 권한 > 알림] 메뉴에서 끌 수 있습니다.
  
  향후에는 앱스토어/플레이스토어에서 다운로드할 수 있는 공식 앱도 출시될 예정이에요.
  더 편리한 사용 환경을 위해 계속 발전해 나가겠습니다 :)`,
  },

  {
    category: '공통',
    title: '1:1 문의는 어떻게 신청하나요?',
    content: '현재 1:1 문의 기능은 준비 중이에요.\n문의 사항이 있으시면 아래 이메일로 연락 부탁드려요.\n\n📧 help.celestara@gmail.com',
  },

  { category: '공통', title: '닉네임 변경은 어떻게하나요?', content: '마이페이지 > 회원정보에서 언제든지 닉네임 변경이 가능해요.' },

  {
    category: '공통',
    title: '알림은 어떤 경우에 오고, 설정은 어떻게 하나요?',
    content: `현재 알림은 아래와 같은 경우에 자동으로 발송됩니다:
  
  - 이력서 지원 요청 및 취소
  - 지원자 관련 알림 (예: 지원 접수, 합격 여부)
  - 쿠폰 및 이벤트 안내
  
  다만, 알림 수신 여부를 개별적으로 설정하거나 중지하는 기능은 아직 제공되지 않습니다.
  알림 설정 기능은 추후 업데이트를 통해 추가될 예정이니, 조금만 기다려 주세요 :)`,
  },

  {
    category: '공통',
    title: '회원 탈퇴는 어디서 하나요?',
    content: '개인 회원: 마이페이지 > 회원정보 하단\n업체 회원: 사업주 페이지 > 개인정보 페이지 하단에서 탈퇴하실 수 있어요.',
  },

  {
    category: '개인회원',
    title: '이력서 등록은 누구나 가능한가요?',
    content: '네, 별도 비용없이 개인 회원이라면 누구나 이력서를 등록할 수 있어요. 나만의 이력서를 만들어보세요!',
  },

  {
    category: '개인 회원',
    title: '개인회원은 어떤 기능을 이용할 수 있나요?',
    content: '공고 지원, 이력서 작성, 지원 내역 확인 등 다양한 기능을 사용할 수 있어요.',
  },

  {
    category: '업체 회원',
    title: '결제 시 적립된 포인트는 어디에 사용하나요?',
    content: `결제 시 자동으로 포인트가 적립되지만, 현재는 포인트 사용 기능은 아직 제공되지 않고 있어요.
  
  포인트는 추후 혜택 제공 등에 사용할 수 있도록 준비 중입니다.
  포인트 사용 기능이 열리면 별도로 안내드릴게요 :)`,
  },

  {
    category: '업체 회원',
    title: '아이디를 여러개 만들수있나요?',
    content: '여러 개의 아이디 생성은 가능하지만, 동일한 사업자 등록번호나 본인 인증 정보로는 중복 생성이 제한돼요.',
  },
  {
    category: '업체 회원',
    title: '아이디/비밀번호를 잊어버렸어요!',
    content: '현재 아이디/비밀번호 찾기 기능은 준비 중이에요.\n불편하시겠지만, 이메일 문의를 통해 요청해주시면 최대한 빠르게 도와드릴게요!',
  },
  {
    category: '업체 회원',
    title: '탈퇴 후 동일한 인증정보로 인증이 되지 않아요.',
    content: `탈퇴하신 경우 기존에 사용하셨던 본인 인증 정보로는 다시 가입하실 수 없습니다.
  
    이는 중복 가입 및 부정 사용 방지를 위한 조치이며,
    다른 인증 수단을 통해 가입을 진행해 주세요.`,
  },
  {
    category: '업체 회원',
    title: '이미 인증된 휴대폰 번호라고 나와요.',
    content: '탈퇴한 경우에도 기존 인증 정보로는 재가입이 불가능합니다. 다른 인증 수단을 사용해주세요.',
  },
  {
    category: '업체 회원',
    title: '채용 공고를 마감했는데, 남은 기간만큼 다시 사용할 수 있나요?',
    content:
      '한 번 마감한 공고는 다시 사용할 수 없습니다.\n마감 버튼을 누를 때, 남은 기간이 소멸된다는 안내 모달이 표시되며, 확인 후 마감 처리됩니다.',
  },
  {
    category: '업체 회원',
    title: '모바일에서 업체 페이지 화면이 깨져보여요',
    content: '현재 업체 페이지는 모바일 환경을 완벽히 지원하지 않아요. PC에서 접속해주시길 권장드려요.',
  },
  {
    category: '업체 회원',
    title: '사업자 가입을 한 적이 없는데 이미 가입된 사업자라고 나와요.',
    content: `동일한 사업자 등록번호로 이미 가입된 이력이 있는 경우, 중복 가입이 제한될 수 있습니다.
  
  만약 본인이 가입한 적이 없다면, 불편하시더라도 이메일로 문의해주세요.  
  확인 후 빠르게 도와드릴게요 :)`,
  },
] as const;
