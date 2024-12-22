import styled from 'styled-components';
import { policy } from '@/constants/policy';

interface PolicyTermsProps {}

export default function PolicyTerms({}: PolicyTermsProps) {
  {
    /* <p>&nbsp;</p> */
  }
  return (
    <S.PolicyTerms>
      <S.Title>제 1 장 [총 칙]</S.Title>
      <S.Section>
        <S.SubTitle>제 1 조 목적</S.SubTitle>
        <S.Content>
          본 약관은 셀레스타라(이하 “회사”)이 운영하는 웹사이트(이하 “사이트”라 합니다) 및 모바일 애플리케이션(이하 “애플리케이션”이라 하며,
          사이트와 애플리케이션을 총칭하여 “사이트 등”이라 합니다)을 통해 서비스를 제공함에 있어 회사와 이용자의 이용조건 및 제반 절차, 기타
          필요한 사항의 규정을 목적으로 합니다.
        </S.Content>
      </S.Section>

      <S.Section>
        <S.SubTitle>제 2 조 용어의 정의</S.SubTitle>
        <S.Content>
          <p>1. “사이트”라 함은 회사가 서비스를 이용자에게 제공하기 위하여 개발, 유지보수 및 운영하는 사이트를 말합니다.</p>

          <p>
            2. “애플리케이션”이라 함은 회사와 계열사가 이용자에게 서비스를 제공하기 위하여IOS, 안드로이드 등 운영체제와 관계없이 스마트폰
            또는 기타 휴대용 단말기에서 이용할 수 있도록 제작, 운영하는 프로그램을 말합니다. 현재 회사가 운영하는 애플리케이션의 이름은 “
            {policy.application}“입니다.
          </p>

          <p>
            3. “서비스“라 함은 채용정보, 이력서 및 기업정보 제공 기타의 서비스를 통하여 구직•채용시장에서 구직자와 기업의 연결을 돕는 플랫폼
            서비스입니다. 구체적으로는 회사가 기업 또는 구직자가 구인, 구직과 교육을 목적으로 등록하는 각종 자료를 DB화하여 각각의 목적에
            맞게 분류 가공, 집계하여 정보를 제공하는 서비스 및 기타 구인 및 구직이 원활히 이루어지도록 하기 위하여 사이트 등에서 제공하는
            모든 서비스를 말합니다. 회사가 제공하는 서비스는 유형에 따라 무료 또는 유료로 제공됩니다.
          </p>

          <p>
            4. “이용자“라 함은 사이트 등에 접속하여 본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원(기업회원 및 개인회원을 포함) 및
            비회원을 말합니다.
          </p>
          <p>
            5. “개인회원“이라 함은 본 서비스를 이용하기 위하여 본 약관에 동의하고 회사와 서비스 이용계약을 체결하여 개인회원ID를 부여받은
            이용자를 말합니다.
          </p>

          <p>
            6. “비회원”이라 함은 회사와 서비스 이용계약을 체결하지 않은 채 사이트 등을 통하여 회사가 제공하는 서비스를 이용하는 이용자를
            말합니다.
          </p>
          <p>
            7. “서비스 이용계약“이라 함은 회사가 개인회원을 위해 제공하는 서비스를 계속적으로 이용하기 위하여 회사와 이용자 사이에 체결되는
            계약을 말합니다.
          </p>

          <p>
            8. “이용자ID“ 또는 “개인회원ID“라 함은 개인회원의 식별 및 서비스 이용을 위하여 개인회원이 선정하거나 회사가 부여하는 문자와
            숫자의 조합을 말합니다.
          </p>

          <p>
            9. “비밀번호“라 함은 회사의 서비스를 이용하려는 사람이 개인회원ID를 부여 받은 자와 동일인임을 확인하고 개인회원한 문자와 숫자의
            조합을 말합니다.
          </p>
          <p>
            10. “기업회원“이라 함은 회사가 제공하는 서비스를 이용하기 위하여 회사와 서비스 이용계약을 체결하고 기업회원ID를 부여받은
            이용자를 말합니다.
          </p>
        </S.Content>
      </S.Section>

      <S.Section>
        <S.SubTitle>제 3조 약관의 명시와 개정</S.SubTitle>
        <S.Content>
          <p>
            1. 회사는 본 약관의 내용과 상호, 영업소 소재지, 사업자등록번호, 연락처 등을 이용자가 알 수 있도록 초기 화면에 게시하거나 기타의
            방법으로 이용자에게 공지합니다. 약관의 내용은 이용자가 사이트 등의 링크를 통한 연결화면을 통하여 볼 수 있도록 할 수 있습니다.
          </p>
          <p>
            2. 회사는 약관의 규제 등에 관한 법률, 전기통신기본법, 전기통신사업법, 정보통신망 이용 촉진 및 정보보호 등에 관한 법률 등
            관련법을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.
          </p>

          <p>
            3. 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 사이트 등에서 그 적용일자 7일 전부터 적용일자
            전일까지 공지합니다. 다만, 이용자에게 불리한 약관의 변경인 경우에는 그 적용일자 30일 전부터 적용일자 전일까지 공지합니다.
          </p>

          <p>
            4. 개인회원은 변경된 약관에 대해 거부할 권리가 있으며, 개인회원은 변경된 약관이 공지된 지 15일 이내에 변경 약관에 대한 거부
            의사를 표시할 수 있습니다. 만약, 개인회원이 거부 의사를 표시하지 않고 서비스를 계속 이용하는 경우, 회사는 개인회원이 변경 약관
            적용에 동의하는 것으로 봅니다.
          </p>

          <p>
            5. 개인회원이 제4항에 따라 변경 약관 적용을 거부할 의사를 표시한 경우, 회사는 개인회원에게 15일의 기간을 정하여 사전 통지 후
            해당 개인회원과의 서비스 이용계약 또는/및 별도로 체결된 계약을 해지할 수 있습니다.
          </p>
        </S.Content>
      </S.Section>

      <S.Section>
        <S.SubTitle>제 4조 약관 외 준칙</S.SubTitle>
        <S.Content>
          <p>
            1. 약관에서 규정하지 않은 사항에 관해서는 약관의 규제 등에 관한 법률, 정보통신망 이용 촉진 및 정보보호 등에 관한 법률, 개인정보
            보호법, 전기통신기본법, 전기통신사업법 등의 관계법령에 따라 규율됩니다.
          </p>
          <p>
            2. 개인회원이 유료 서비스를 구입함에 있어 유료 서비스 이용조건에 관하여 별도로 약정하는 경우, 본 약관에 우선하여 해당 약정이
            적용됩니다. 그 밖에 회사가 운영하는 개별 서비스 이용약관이 별도로 있는 경우 해당 서비스 이용약관이 본 약관에 우선하여
            적용됩니다.
          </p>
          <p>
            3. 회원이 회사와 개별 계약을 체결하여 서비스를 이용하는 경우, 개인회원의 서비스 이용과 관련된 권리 의무는 순차적으로 개별 계약,
            개별 서비스 이용약관, 본 약관에서 정한 내용에 따라 규율됩니다.
          </p>
        </S.Content>
      </S.Section>

      <S.Section>
        <S.SubTitle>제 5조 개인회원에 대한 고지, 통지 및 공지</S.SubTitle>
        <S.Content></S.Content>
      </S.Section>
    </S.PolicyTerms>
  );
}

const S = {
  PolicyTerms: styled.div`
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
