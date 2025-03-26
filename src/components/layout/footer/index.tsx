import styled from 'styled-components';
import Link from 'next/link';
import path from '@/constants/path';
import { POLICY } from '@/constants/policy';

interface FooterProps {
  marginTop?: string;
}

export function Footer({ marginTop }: FooterProps) {
  return (
    <S.Footer $marginTop={marginTop}>
      <div className="container">
        <S.Category>
          {/* <li className="item">
            <Link href={path.SUPPORT_NOTICE} prefetch={false}>
              고객센터
            </Link>
          </li> */}
          <li className="item">
            <Link href={path.POLICY_TERMS} prefetch={false}>
              서비스 이용약관
            </Link>
          </li>
          <li className="item">
            <Link href={path.POLICY__PRIVACY} prefetch={false}>
              개인정보 처리방침
            </Link>
          </li>
        </S.Category>
        <S.Information>
          <h6 className="company">{POLICY.company}</h6>
          <p className="info-text">고원호 | 사업자등록번호: {POLICY.businessNumber}</p>
          <p className="info-text">통신판매업 신고번호: {POLICY.mailOrderNumber}</p>
          <p className="info-text">{POLICY.email}</p>
          <p className="info-text">{POLICY.address}</p>
          <p className="info-text">COPYRIGHT ⓒ CELESTARA ALL RIGHTS RESERVED.</p>
        </S.Information>
      </div>
    </S.Footer>
  );
}

const S = {
  Footer: styled.footer<{ $marginTop?: string }>`
    margin-top: ${(props) => (props.$marginTop ? props.$marginTop : '30px')};
    background-color: ${(props) => props.theme.colors.gray};
    width: 100%;
    padding: 40px 0 30px 0;
    ${(props) => props.theme.media.laptop`
      padding: 50px 0 80px 0;
    `};
    .container {
      max-width: 1024px;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      ${(props) => props.theme.media.laptop`
        padding: 0 15px;
      `};
    }
  `,
  Category: styled.ul`
    display: flex;
    margin: 0 auto;
    font-size: 13px;
    margin-bottom: 20px;
    .item {
      cursor: pointer;
      padding-right: 30px;
      color: ${(props) => props.theme.colors.gray600};
      &:last-child {
        padding-right: 0;
      }
      &:hover {
        text-decoration: underline;
        color: ${(props) => props.theme.colors.black100};
      }
    }
  `,
  Information: styled.div`
    .company {
      font-size: 13px;
      margin-bottom: 3px;
      color: ${(props) => props.theme.colors.gray800};
    }
    .info-text {
      font-size: 11px;
      padding: 2px 0;
      color: ${(props) => props.theme.colors.gray600};
      font-weight: 300;
    }
  `,
};
