import styled from 'styled-components';
import Link from 'next/link';
import path from '@/constants/path';
import { policy } from '@/constants/policy';

export function Footer() {
  return (
    <S.Footer>
      <div className="container">
        <S.Category>
          <li className="item">
            <Link href={path.SUPPORT_NOTICE} prefetch={false}>
              고객센터
            </Link>
          </li>
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
          <p className="item">사업자등록번호: {policy.businessNumber} | 대표자: 고원호</p>
          <p className="item">통신판매업 신고번호: {policy.mailOrderNumber}</p>
          <p className="item">{policy.address}</p>
          <p className="item">이메일: {policy.email}</p>
          <p className="item">연락처: {policy.phone}</p>
          <strong className="item company">COPYRIGHT ⓒ HOTEL JOB ALL RIGHTS RESERVED.</strong>
        </S.Information>
      </div>
    </S.Footer>
  );
}

const S = {
  Footer: styled.footer`
    margin-top: 30px;
    background-color: ${(props) => props.theme.colors.gray};
    width: 100%;
    padding: 50px 0 50px 0;
    .container {
      max-width: 1024px;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      ${(props) => props.theme.media.tablet`
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
    font-size: 13px;
    .item {
      padding: 2px 0;
      color: ${(props) => props.theme.colors.gray600};
    }
    .company {
      display: inline-block;
      margin-top: 5px;
      color: ${(props) => props.theme.colors.gray900};
    }
  `,
};
