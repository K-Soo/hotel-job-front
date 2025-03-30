import React from 'react';
import styled from 'styled-components';
import Icon from '@/icons/Icon';
import { motion } from 'framer-motion';

interface HelpContentProps {
  item: { category: string; content: string; title: string };
}

export default function HelpContent({ item }: HelpContentProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <S.HelpContent>
      <div className="content" onClick={() => setIsOpen((prev) => !prev)}>
        <div className="content__text">
          <span className="content__text--category">{item.category}</span>
          <motion.h6 className="content__text--title" whileHover={{ textDecoration: 'underline' }}>
            {item.title}
          </motion.h6>
        </div>

        <motion.span
          initial={{ rotate: 270 }}
          animate={{ rotate: isOpen ? 90 : 270 }}
          transition={{ duration: 0.2 }}
          className="content__icon"
        >
          <Icon name="ArrowLeft24x24" width="18px" height="18px" />
        </motion.span>
      </div>

      {isOpen && (
        <motion.div className="detail">
          <div className="detail__text" dangerouslySetInnerHTML={{ __html: item.content }} />
        </motion.div>
      )}
    </S.HelpContent>
  );
}

const S = {
  HelpContent: styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
    .content {
      padding: 15px;
      display: flex;
      height: 60px;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      &__text {
        display: flex;
        align-items: center;
        ${(props) => props.theme.media.tablet`
          flex-direction: column;
          align-items: flex-start;
        `};
        &--title {
          font-size: 14px;
          padding: 0 30px;
          line-height: 1.2;
          color: ${({ theme }) => theme.colors.gray800};
          ${(props) => props.theme.media.tablet`
            padding: 0 15px 0 0;
          `};
        }
        &--category {
          font-size: 13px;
          font-weight: 400;
          color: ${({ theme }) => theme.colors.black};
          min-width: 55px;
          font-weight: 500;
          ${(props) => props.theme.media.tablet`
            padding-bottom: 3px;
          `};
        }
      }
      &__icon {
        color: ${({ theme }) => theme.colors.gray500};
      }
    }
    .detail {
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray800};
      background-color: ${({ theme }) => theme.colors.gray};
      padding: 30px;
      ${(props) => props.theme.media.tablet`
        padding: 15px;
      `};
      &__text {
        line-height: 1.5;
        white-space: pre-line;
      }
    }
  `,
};
