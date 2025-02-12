import React from 'react';
import { EmployerAccountInfo } from '@/types';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import Modal from '@/components/common/modal';
import MembershipModalForm from '@/components/employer/MembershipModalForm';

const DynamicNoSSRModal = dynamic(() => import('@/components/common/modal'), { ssr: false });

interface SupportInfoProps {
  data: EmployerAccountInfo;
}

export default function SupportInfo({ data }: SupportInfoProps) {
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  return (
    <>
      {isOpenModal && (
        <DynamicNoSSRModal handleCloseModal={() => setIsOpenModal(false)}>
          <Modal.Header title="멤버십 안내" handleCloseModal={() => setIsOpenModal(false)} />
          <Modal.Content padding="0">
            <MembershipModalForm />
          </Modal.Content>
        </DynamicNoSSRModal>
      )}

      <S.SupportInfo>
        <div className="item">
          <span className="item__title">멤버십</span>
          <span className="item__content" onClick={() => setIsOpenModal(true)}>
            {data.membership.membershipLevel}
          </span>
        </div>

        <div className="item">
          <span className="item__title">보유포인트</span>
          <span className="item__content">{data.totalPoint}P</span>
        </div>

        <div className="item">
          <span className="item__title">보유쿠폰</span>
          <span className="item__content">{3}</span>
        </div>
      </S.SupportInfo>
    </>
  );
}

const S = {
  SupportInfo: styled.div`
    height: 180px;
    border: 1px solid ${({ theme }) => theme.colors.gray400};
    border-radius: 10px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      &__title {
        font-size: 16px;
        margin-bottom: 20px;
        font-weight: 400;
        color: ${({ theme }) => theme.colors.black400};
      }
      &__content {
        font-size: 24px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.black500};
        cursor: pointer;
        width: 100%;
        text-align: center;
        &:hover {
          color: ${({ theme }) => theme.colors.black100};
          text-decoration: underline;
        }
      }
    }
  `,
};
