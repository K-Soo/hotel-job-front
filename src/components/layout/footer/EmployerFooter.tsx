import React from 'react';
import styled from 'styled-components';
import Modal from '@/components/common/modal';
import dynamic from 'next/dynamic';

const DynamicNoSSRModal = dynamic(() => import('@/components/common/modal'), { ssr: false });

export function EmployerFooter() {
  const [isOpenPartnership, setIsOpenPartnership] = React.useState(false);

  return (
    <>
      {isOpenPartnership && (
        <DynamicNoSSRModal handleCloseModal={() => setIsOpenPartnership(false)}>
          <Modal.Header title="제휴문의" handleCloseModal={() => setIsOpenPartnership(false)} borderBottom="none" />
          <Modal.Content>
            <S.PartnershipContent>
              <h6 className="title">다양한 제휴기회를 기다리고 있습니다.</h6>
              <p className="description">
                호텔잡은 고객에게 새로운 가치를 전달하고,
                <br />
                시너지를 높일 수 있는 다양한 제휴 기회를 모색하고 있습니다.
              </p>
              <p className="description">
                광고, 마케팅, 채용, 등 다양한 분야에서 제휴를 통해 서로의 가치를
                <br />
                높여나갈 수 있는 다양한 분야의 좋은 인연을 기다립니다.
                <br />
                메일을 통해 제휴 문의를 주시면 신속하게 답변 드리겠습니다.
              </p>

              <b className="email">help.celestara@gmail.com</b>
            </S.PartnershipContent>
          </Modal.Content>
        </DynamicNoSSRModal>
      )}

      <S.EmployerFooter>
        <div>©2025 celestara</div>
        <div className="right">
          <button className="right__partnership" onClick={() => setIsOpenPartnership(true)}>
            제휴 문의
          </button>
          {/* <button className="right__notice">고객센터</button> */}
        </div>
      </S.EmployerFooter>
    </>
  );
}

const S = {
  EmployerFooter: styled.footer`
    border-top: 1px solid ${(props) => props.theme.colors.gray200};
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 13px;
    padding: 0 30px 0 20px;
    color: ${(props) => props.theme.colors.gray500};
    display: flex;
    justify-content: space-between;
    .right {
      &__partnership {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      &__notice {
        cursor: pointer;
        margin-left: 25px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  `,
  PartnershipContent: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 0;
    .title {
      font-size: 22px;
      margin-bottom: 30px;
      color: ${(props) => props.theme.colors.blue700};
    }
    .description {
      padding: 15px 0;
      line-height: 1.6;
      font-size: 16px;
      text-align: center;
      color: ${(props) => props.theme.colors.gray800};
    }
    .email {
      margin-top: 30px;
      font-size: 22px;
      user-select: all;
    }
  `,
};
