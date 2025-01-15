import styled from 'styled-components';

interface RecruitDetailContentProps {
  content: string;
}

export default function RecruitDetailContent({ content }: RecruitDetailContentProps) {
  return (
    <S.RecruitDetailContent>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </S.RecruitDetailContent>
  );
}

const S = {
  RecruitDetailContent: styled.div`
    margin-bottom: 50px;
    color: ${({ theme }) => theme.colors.black200};
    h1 {
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 5px;
    }
    h2 {
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 5px;
    }
    h3 {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 5px;
    }
    p {
      font-size: 16px;
      line-height: 1.2;
      letter-spacing: 0.0057em;
      font-weight: 300;
    }
    ul {
      list-style: disc;
      padding-left: 15px;
      font-weight: 300;
    }
    ul li::marker {
      color: ${({ theme }) => theme.colors.black500};
      font-size: 15px;
    }
    ol li::marker {
      color: ${({ theme }) => theme.colors.black500};
      font-size: 15px;
    }
    ol {
      list-style: decimal;
      padding-left: 15px;
      font-weight: 300;
    }
    ol li::marker {
      font-size: 14px;
    }
    li {
      line-height: 1.2;
    }
  `,
};
