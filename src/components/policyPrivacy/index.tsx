import styled from 'styled-components';
import { POLICY } from '@/constants/policy';

export default function PolicyPrivacy() {
  return (
    <S.PolicyPrivacy>
      <S.Section>
        <S.SectionTitle>개인정보 처리방침</S.SectionTitle>
        <S.Content>
          <p>
            {POLICY.company}(이하 “회사”)는 「신용정보의 이용 및 보호에 관한 법률」, 「전자금융거래법」, 「전자상거래법」, 「정보통신망
            이용촉진 및 정보보호 등에 관한 법률」, 「개인정보 보호법」, 「특정 금융거래정보의 보고 및 이용 등에 관한 법률」 등 관련 법규에
            따라 이용자의 개인(신용)정보를 보호하고 개인(신용)정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같이 개인정보
            처리방침을 수립‧공개합니다.
          </p>
          <br />
        </S.Content>
      </S.Section>

      <S.Section>
        <S.SubTitle>개인정보 수집 및 이용 현황</S.SubTitle>
        <S.Content>
          <p>
            회사는 서비스 제공을 위한 최소한의 범위 내에서 정보주체의 동의 하에 개인정보를 수집하며, 수집한 모든 개인정보는 고지한 목적 범위
            내에서만 사용됩니다. 또한, 제공하는 서비스(채용 정보제공 등) 특성상 「근로기준법」에 따라 만19세 미만인 경우 회원가입을 허용하지
            않습니다. 회사에서 제공하는 서비스 유형에 따라 다음과 같이 개인정보를 수집, 이용, 보유 및 파기하고 있습니다.
          </p>

          <br />

          <table>
            <caption style={{ textAlign: 'left' }}>일반 회원</caption>
            <thead>
              <tr>
                <th style={{ width: '15%' }}>수집방법</th>
                <th style={{ width: '25%' }}>수집항목</th>
                <th style={{ width: '50%' }}>수집 및 이용목적</th>
                <th style={{ width: '10%' }}>보관 기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>간편가입 및 로그인</td>
                <td>(필수)카카오,구글: 이메일</td>
                <td>
                  회원 가입 및 관리, 상품 구매 및 결제, 공지사항 및 회원 설정 기반 정보 제공, 서비스 이용 또는 콘텐츠 활용 관련 사용자 출처
                  표시, 서비스 제공을 위한 업무의 처리 <br />※ 당사는 고객의 편의를 위해 간편 로그인(카카오, 구글) 방식을 제공하고 있습니다.
                  이와 같은 로그인시 당사가 고객의 개인정보를 추가 수집하지 않으며, 본인확인값만 비교하고 있습니다.
                </td>
                <td>회원탈퇴 시</td>
              </tr>
              <tr>
                <td>본인인증</td>
                <td>(필수) 이름, 생년월일, 성별, 중복가입확인정보(DI), 암호화된 동일인 식별정보(CI), 휴대폰번호, 외국인 구분 값</td>
                <td>이용자 식별 및 본인여부 확인</td>
                <td>회원탈퇴 시</td>
              </tr>
              <tr>
                <td>이력서 작성</td>
                <td>
                  (필수) 기본정보(이름, 생년월일, 이메일, 휴대폰, 주소), 학력(학교명, 졸업여부, 전공)
                  <br />
                  (선택) 추가입력항목(경력, 자격증, 어학, 기타)
                </td>
                <td>
                  이력서 등록을 통한 입사지원 등 취업활동 서비스 제공, 각종 맞춤형 취업서비스 제공, 서비스 및 유료 상품 이용에 따른 이력서
                  연동
                </td>
                <td>회원탈퇴 및 이력서 삭제 시</td>
              </tr>
              {/* <tr>
                <td>상품 결제</td>
                <td>(필수) 결제정보(카드사명, 카드번호), 휴대폰(휴대폰번호, 통신사정보)</td>
                <td>유료서비스 구매 및 이용 시 요금 정산</td>
                <td>회원탈퇴 시</td>
              </tr> */}
              <tr>
                <td>고객문의 및 상담</td>
                <td>(필수) 이메일</td>
                <td>문의에 따른 원활한 상담 제공 및 헬프 메일을 통한 문의 답변</td>
                <td>회원탈퇴 시</td>
              </tr>
              {/* <tr>
                <td>신고 문의</td>
                <td>(필수) 아이디, 성명, 이메일, 전화번호</td>
                <td>신고인 확인, 불법촬영물 등 유통신고 접수 및 처리, 방송통신심의위원회 심의 요청</td>
                <td>회원탈퇴 시</td>
              </tr> */}
            </tbody>
          </table>

          <br />

          <table>
            <caption style={{ textAlign: 'left' }}>기업 및 업체 회원</caption>
            <thead>
              <tr>
                <th style={{ width: '15%' }}>수집방법</th>
                <th style={{ width: '25%' }}>수집항목</th>
                <th style={{ width: '50%' }}>수집 및 이용목적</th>
                <th style={{ width: '10%' }}>보관 기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>가입 및 로그인</td>
                <td>아이디, 이용동의 항목</td>
                <td>
                  회원 가입 및 관리, 상품 구매 및 결제, 공지사항 및 회원 설정 기반 정보 제공, 서비스 이용 또는 콘텐츠 활용 관련 사용자 출처
                  표시, 서비스 제공을 위한 업무의 처리
                </td>
                <td>회원탈퇴 시</td>
              </tr>
              <tr>
                <td>본인인증</td>
                <td>(필수) 이름, 생년월일, 성별, 중복가입확인정보(DI), 암호화된 동일인 식별정보(CI), 휴대폰번호, 외국인 구분 값</td>
                <td>이용자 식별 및 본인여부 확인</td>
                <td>회원탈퇴 시</td>
              </tr>
              <tr>
                <td>채용 공고 등록 시</td>
                <td>(필수) 담당자 정보(이름, 휴대폰, 이메일주소)</td>
                {/* 인재풀 없음 */}
                {/* <td>공고 등록을 통한 인재풀 서비스 제공, 각종 맞춤형 취업서비스 제공, 서비스 및 유료 상품 이용에 따른 공고 연동</td> */}
                <td>각종 맞춤형 취업서비스 제공, 서비스 및 유료 상품 이용에 따른 공고 연동</td>
                <td>회원탈퇴 및 공고 삭제 시</td>
              </tr>
              <tr>
                <td>상품 결제</td>
                <td>(필수) 결제정보(카드사명, 카드번호), 휴대폰(휴대폰번호, 통신사정보)</td>
                <td>유료서비스 구매 및 이용 시 요금 정산</td>
                <td>회원탈퇴 시</td>
              </tr>
              <tr>
                <td>고객문의 및 상담</td>
                <td>(필수) 이메일</td>
                <td>문의에 따른 원활한 상담 제공 및 헬프 메일을 통한 문의 답변</td>
                <td>회원탈퇴 시</td>
              </tr>
              <tr>
                <td>기업인증</td>
                <td>(필수) 사업자 등록번호, 기업명, 대표자명, 회사주소, 업종, 사업자 증빙서류(사업자등록증)</td>
                <td>채용 서비스 이용을 위한 기업 인증</td>
                <td>회원탈퇴 시</td>
              </tr>
              <tr>
                <td>제휴문의 및 상담</td>
                <td>이름, 연락처, 이메일 주소</td>
                <td>문의에 따른 원활한 상담 제공</td>
                <td>회원탈퇴 시</td>
              </tr>
            </tbody>
          </table>

          <br />

          <table>
            <caption style={{ textAlign: 'left' }}>선택정보의 수집 항목</caption>
            <thead>
              <tr>
                <th style={{ width: '15%' }}>수집방법</th>
                <th style={{ width: '25%' }}>수집항목</th>
                <th style={{ width: '50%' }}>수집 및 이용목적</th>
                <th style={{ width: '10%' }}>보관 기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SMS 마케팅 수신 동의 시</td>
                <td>휴대폰 번호</td>
                <td>마케팅 활용목적</td>
                <td>회원탈퇴 및 동의 취소</td>
              </tr>
              <tr>
                <td>이메일 마케팅 수신 동의 시</td>
                <td>이메일 주소</td>
                <td>마케팅 활용목적</td>
                <td>회원탈퇴 및 동의 취소</td>
              </tr>
            </tbody>
          </table>

          <br />

          <table>
            <caption style={{ textAlign: 'left' }}>서비스 이용에 따른 자동 수집 및 생성 정보</caption>
            <thead>
              <tr>
                <th style={{ width: '50%' }}>수집항목</th>
                <th style={{ width: '50%' }}>수집 및 이용목적</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>쿠키, 서비스이용기록(방문일시, IP, 불량이용기록), 모바일 기기정보(디바이스토큰, 디바이스ID, OS버전)</td>
                <td>접속관리, 정보주체별 사용환경 제공, 활동정보 파악, 이벤트 및 프로모션 통계 확인, 맞춤형 채용정보 제공</td>
              </tr>
            </tbody>
          </table>
        </S.Content>
      </S.Section>

      <S.Section>
        <S.SubTitle>개인정보 제3자 제공</S.SubTitle>
        <S.Content>
          <p>
            회사는 「개인정보 수집 및 이용 현황」 에서 고지한 범위 내에서만 개인정보를 이용하며, 원칙적으로 정보주체의 개인정보를 제3자에게
            제공하지 않습니다.
          </p>

          <br />

          <p>
            다만, 법령에 따라 수집 목적과 합리적 범위에서 개인정보를 제공할 경우 정보주체의 동의 없이 제3자에게 제공할 수 있습니다.
            제3자에게 개인정보를 제공할 경우 당초 수집 목적과 관련성이 있는지, 수집한 정황 또는 처리 관행에 비추어 볼 때 예측 가능성이
            있는지, 고객님의 이익을 부당하게 침해하는지, 암호화 등 안전성 확보에 필요한 조치를 하였는지를 종합적으로 고려합니다.
          </p>

          <br />

          <p>&bull; 법령의 규정에 의겨하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</p>
          <p>&bull; 자사 컨텐츠와 각 취업사이트 간 업무제휴를 맺고 채용공고 동시 등록 등의 서비스를 펼치는 경우</p>
        </S.Content>
      </S.Section>

      <S.Section>
        <S.SubTitle>개인정보 처리위탁</S.SubTitle>
        <S.Content>
          <p>
            회사는 개인정보의 처리와 관련하여 아래와 같이 업무를 위탁하고 있으며, 관계법령에 따라 위탁 처리되는 개인정보가 안전하게 관리될
            수 있도록 필요한 조치를 취하고 있습니다. 또한 위탁 처리하는 정보는 서비스 제공에 필요한 최소한의 범위에 국한됩니다. 회사에서
            위탁처리 되고 있는 업무는 다음과 같고, 위탁사항이 변경되는 경우 해당 사실을 알려드리겠습니다.
          </p>

          <br />

          <strong>수탁자 없음.</strong>

          <table>
            <thead>
              <tr>
                {/* <th>수탁자</th> */}
                {/* <th>위탁업무</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td>토스페이먼츠</td> */}
                {/* <td>결제 처리 및 대행</td> */}
              </tr>
              <tr>
                {/* <td>나이스아이핀</td> */}
                {/* <td>본인확인 서비스 제공</td> */}
              </tr>
            </tbody>
          </table>
        </S.Content>
      </S.Section>

      <S.Section>
        <S.SubTitle>개인정보 보유 및 이용기간</S.SubTitle>
        <S.Content>
          <p>
            회사는 정보주체의 개인정보를 고지 및 동의 받은 사항에 따라 수집∙이용 목적이 달성되기 전 또는 정보주체의 탈퇴 요청이 있기 전까지
            해당 정보를 보유합니다. 다만, 아래의 사유로 인하여 보관이 필요한 경우 외부와 차단된 별도 DB 또는 테이블에 분리 보관 됩니다.
          </p>

          <br />

          <p>가. 서비스 제공을 위해 수집한 정보 : 회원탈퇴 시까지</p>

          <p>나. 관련 법령에 의한 개인정보 보유</p>
          <S.Heading>통신비밀보호법</S.Heading>
          <p>&bull; 서비스 이용기록, 접속로그, 접속IP정보 : 3개월</p>

          <S.Heading>전자상거래 등에서의 소비자보호에 관한 법률</S.Heading>
          <p>&bull; 표시∙광고에 관한 기록 : 6개월</p>
          <p>&bull; 계약 또는 청약철회 등에 관한 기록 : 5년</p>
          <p>&bull; 대금결제 및 재화등의 공급에 관한 기록 : 5년</p>
          <p>&bull; 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년</p>

          <S.Heading>부가가치세법</S.Heading>
          <p>&bull; 세금계산서, 영수증 등 거래내역 관련 정보 : 5년</p>

          <S.Heading>소득세법</S.Heading>
          <p>&bull; 경비 등의 지출증명 수취 및 보관 : 5년</p>

          <S.Heading>국세기본법</S.Heading>
          <p>&bull; 장부 등의 비치와 보존 : 5년</p>
        </S.Content>
      </S.Section>

      <S.Section>
        <S.SubTitle>개인정보 파기절차 및 방법</S.SubTitle>
        <S.Content>
          <p>
            정보주체의 개인정보는 원칙적으로 개인정보 수집 및 이용목적이 달성되면 지체없이 파기 합니다. 다만, 다른 법령에 의해 보관해야 하는
            정보는 법령이 정한 기간 동안 별도 분리보관 후 파기합니다.
          </p>

          <br />

          <p>가. 파기절차 및 기한</p>
          <p>
            수집·이용목적이 달성된 개인정보는 지체없이 파기되며, 관련 법령에 따라 보관되어야 할 경우 별도의 DB에 옮겨져 내부 규정 및 관련
            법령을 준수하여 일정기간동안 안전하게 보관된 후 지체없이 파기됩니다. 이때, DB로 옮겨진 개인정보는 법률에 의한 경우를 제외하고
            다른 목적으로 이용하지 않습니다.
          </p>

          <br />

          <p>나. 파기절차 및 기한</p>
          <p>전자적 파일 형태의 정보는 복구 및 재생할 수 없는 기술적 방법을 사용하여 완전하게 삭제합니다.</p>
          <p>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</p>
        </S.Content>
      </S.Section>

      <S.Section>
        <S.SubTitle>정보주체 권리 및 행사방법</S.SubTitle>
        <S.Content>
          <p>
            정보주체는 홈페이지(www.hotel-job-connect)를 통해 언제든지 아래의 권리를 행사할 수 있으며, 회사는 관련된 상담 및 문의 처리를
            위해 별도의 고객센터를 운영하고 있습니다.
          </p>

          <br />

          <p>가. 조회 및 수정</p>
          <p>개인 : 홈페이지의 「MY {'>'} 회원정보」 기능을 통해 개인정보를 조회 · 수정할 수 있습니다.</p>

          <br />

          <p>나. 회원탈퇴</p>
          <p>
            개인 : 홈페이지의 「MY {'>'} 회원정보」 탈퇴 기능을 통해 개인정보를 삭제할 수 있으며, 회원 탈퇴 즉시 보유 중인 이력서도 삭제처리
            됩니다.
          </p>
          <p>기업 : 홈페이지의 「MY {'>'} 탈퇴」 기능을 통해 개인정보를 삭제할 수 있으며, 회원 탈퇴 즉시 모든 데이터가 삭제됩니다.</p>

          <br />

          <p>다. 동의철회</p>
          {/* <p>
            개인 : 각종 알림 수신에 대한 동의철회는 「MY PAGE {'>'} 계정정보 설정에서 가능하며, 인재정보 등록 여부 설정은 「MY PAGE {'>'} 내
            이력서 관리」에서 변경하실 수 있습니다.
          </p> */}
          <p>개인 : 각종 알림 수신에 대한 동의철회는 「MY PAGE {'>'} 계정정보 설정에서 가능합니다.</p>
          <p>기업 : 각종 알림 수신에 대한 동의철회는 「MY PAGE {'>'} 계정정보 설정에서 가능합니다.</p>
        </S.Content>
      </S.Section>

      <S.Section>
        <S.SubTitle>개인정보 보호책임자 연락처</S.SubTitle>
        <S.Content>
          <p>
            회사의 서비스를 이용하시면서 발생한 모든 개인정보보호 관련 민원, 불만처리 등에 관한 사항을 개인정보 보호책임자 및 고객센터로
            문의하실 수 있고, 회사는 정보주체의 문의에 신속하고 성실하게 답변하겠습니다.
          </p>
          <S.Heading>개인정보 보호책임자 및 신용정보관리·보호인</S.Heading>
          <p>&bull; {POLICY.name}</p>
          {/* <p>&bull; {POLICY.phone}</p> */}
          <p>&bull; {POLICY.email}</p>
        </S.Content>
      </S.Section>

      <S.Section>
        <S.SubTitle>개인정보의 보호조치에 관한 사항</S.SubTitle>
        <S.Content>
          <p>가. 기술적 대책</p>
          <p>
            &bull; 고객의 개인정보는 비밀번호에 의해 보호되며 파일 및 전송데이터를 암호화하거나 파일 잠금기능(Lock)을 사용하여 중요한
            데이터는 별도의 보안기능을 통해 보호되고 있습니다.
          </p>
          <p>
            &bull; 회사는 네트워크 상의 개인정보를 안전하게 전송할 수 있는 전송구간 암호화(SSL)프로토콜을 통해 데이터를 전송하고 있습니다.
          </p>
          <p>
            &bull; 회사는 해킹이나 컴퓨터 바이러스에 의하여 회원님들의 개인정보가 유출되거나 피해를 방지하기 위해 필요한 보안조치를 이용하고
            있으며, 유출이 되지않도록 가능한 모든 기술적 방법을 구비하기위하여 노력하고 있습니다.
          </p>

          <br />

          <p>나. 관리적 대책</p>
          <p>
            &bull; 회사는 개인정보 취급자를 최소한의 인원으로 제한하며, 개인정보를 처리하는 직원을 대상으로 새로운 보안 기술 습득 및
            개인정보 보호 의무 등에 관해 정기적인 교육을 실시하고 있습니다.
          </p>
          <p>
            &bull; 개인정보취급자의 업무 인수인계는 보안이 유지된 상태에서 철저하게 이뤄지고 있으며 입사 및 퇴사가 이루어질경우 개인정보
            사고에 대한 책임을 명확히 하고 있습니다.
          </p>
          <p>
            &bull; 그 외 내부 관리자의 실수나 기술관리 상의 사고로 인해 개인정보의 분실, 도난, 유출, 위∙변조 또는 훼손될 경우 회사는 즉각
            정보주체에게 사실을 알리고 적절한 대책과 보상을 강구할 것입니다.
          </p>
        </S.Content>
      </S.Section>

      <S.Section>
        <S.SubTitle>정보주체의 권익침해에 대한 구제방법</S.SubTitle>
        <S.Content>
          <p>정보주체는 개인신용정보 침해로 인한 신고, 피해구제, 관련 상담이 필요하신 경우 아래의 기관에 문의하실 수 있습니다.</p>

          <br />

          <p>&bull; 개인정보 침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)</p>
          <p>&bull; 개인정보 분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)</p>
          <p>&bull; 대검찰청 사이버범죄수사단 : (국번없이) 1301 (www.spo.go.kr)</p>
          <p>&bull; 경찰청 사이버수사국 : (국번없이) 182 (ecrm.cyber.go.kr)</p>
        </S.Content>
      </S.Section>

      <S.Section>
        <S.SubTitle>기타</S.SubTitle>
        <S.Content>
          <p>
            이 개인정보 처리방침은 시행일로부터 적용되며, 관련 법령 및 회사 정책변경 등에 따른 변경 내용의 추가, 삭제 및 정정사항이 있는
            경우에는 홈페이지를 통해 공지하겠습니다.
          </p>

          <br />

          <p>&bull; 개인정보 처리방침 시행일자 : 2024년 03월 01ㄴ일</p>
        </S.Content>
      </S.Section>
    </S.PolicyPrivacy>
  );
}

const S = {
  PolicyPrivacy: styled.div`
    user-select: none;
    table {
      width: 100%;
      max-width: 800px;
      border-collapse: collapse;
      border: 1px solid #ddd;
      text-align: center;
      font-size: 12px;
      word-break: break-all;
      thead {
        background-color: #f2f2f2;
        border: 1px solid #ddd;
        tr {
          border: 1px solid #ddd;
          th {
            border: 1px solid #ddd;
            text-align: center;
            vertical-align: middle;
            padding: 3px;
          }
        }
      }
      tbody {
        tr {
          border: 1px solid #ddd;
          td {
            border: 1px solid #ddd;
            vertical-align: middle;
            padding: 5px;
            font-size: 11px;
          }
        }
      }
    }
  `,
  SectionTitle: styled.h1`
    color: ${(props) => props.theme.colors.gray900};
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
  `,
  Title: styled.h2`
    color: ${(props) => props.theme.colors.gray900};
    font-size: 18px;
    margin: 50px 0 20px 0;
    font-weight: 600;
  `,
  SubTitle: styled.h3`
    color: ${(props) => props.theme.colors.gray700};
    font-size: 15px;
    margin: 50px 0 20px 0;
    font-weight: 600;
  `,
  Heading: styled.h4`
    color: ${(props) => props.theme.colors.gray700};
    font-size: 14px;
    font-weight: 500;
    margin: 5px 0 1px 0;
  `,
  Section: styled.article``,
  Content: styled.div`
    color: ${(props) => props.theme.colors.gray600};
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
    font-size: 13px;
    line-height: 1.6;
    padding-bottom: 20px;
  `,
};
