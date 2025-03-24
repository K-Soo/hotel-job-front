import React from 'react';
import styled from 'styled-components';
import Button from '@/components/common/style/Button';
interface RecruitDetailContentProps {
  content: string;
}

export default function RecruitDetailContent({ content }: RecruitDetailContentProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isOverflow, setIsOverflow] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      if (contentHeight > 550) {
        setIsOverflow(true);
      }
    }
  }, [content]);

  return (
    <S.RecruitDetailContent $isOverflow={isOverflow}>
      <div className={`content-text ${isExpanded ? 'expanded' : ''}`} dangerouslySetInnerHTML={{ __html: content }} ref={contentRef} />
      {isOverflow && !isExpanded && (
        <Button
          label="상세 정보 더 보기"
          variant="tertiary"
          borderRadius="10px"
          margin="30px 0 0 0"
          onClick={() => setIsExpanded((prev) => !prev)}
        />
      )}
    </S.RecruitDetailContent>
  );
}

const S = {
  RecruitDetailContent: styled.div<{ $isOverflow: boolean }>`
    margin-bottom: 50px;
    color: ${({ theme }) => theme.colors.black200};

    .content-text {
      max-height: 550px;
      overflow: hidden;
      transition: max-height 0.3s ease;
      position: relative;

      ${({ $isOverflow, theme }) =>
        $isOverflow &&
        `
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50px;
          background: linear-gradient(
            rgba(255, 255, 255, 0), 
            ${theme.colors.white}
          );
          pointer-events: none;
          z-index: 1;
        }
      `}
    }

    .content-text.expanded {
      max-height: none;
    }

    /* 확장된 상태에서는 뿌연 효과 제거 */
    .content-text.expanded::after {
      display: none;
    }

    h1 {
      font-weight: 450;
      font-size: 16px;
      margin-bottom: 5px;
    }
    h2 {
      font-weight: 450;
      font-size: 16px;
      margin-bottom: 5px;
    }
    h3 {
      font-size: 16px;
      font-weight: 450;
      margin-bottom: 5px;
    }
    p {
      font-size: 16px;
      line-height: 1.4;
      font-weight: 300;
    }
    ul {
      list-style: decimal;
      padding-left: 25px;
      font-weight: 300;
      line-height: 1.4;
    }
    ol {
      list-style: disc;
      padding-left: 25px;
      font-weight: 300;
      line-height: 1.4;
    }
    ul li::marker {
      color: ${({ theme }) => theme.colors.black500};
      font-size: 15px;
    }
    ol li::marker {
      color: ${({ theme }) => theme.colors.black500};
      font-size: 15px;
    }

    ol li::marker {
      font-size: 14px;
    }
    li {
      line-height: 1.4;
    }
    strong {
      font-weight: 500;
    }
  `,
};
