import React from 'react';
import EmployerAccount from '@/components/employerAccount';
import queryKeys from '@/constants/queryKeys';
import { Get } from '@/apis';
import useFetchQuery from '@/hooks/useFetchQuery';
import CertificationModal from '@/components/common/CertificationModal';
import { useRecoilState } from 'recoil';
import { certificationModalAtom } from '@/recoil/certification';
import SectionTitle from '@/components/common/employer/SectionTitle';
import SkeletonUI from '@/components/common/SkeletonUI';
import Modal from '@/components/common/modal';
import dynamic from 'next/dynamic';
import Button from '@/components/common/style/Button';
import NicknameForm from '@/components/employerAccount/NicknameForm';
import useAuth from '@/hooks/useAuth';

const DynamicNoSSRModal = dynamic(() => import('@/components/common/modal'), { ssr: false });

export default function EmployerAccountContainer() {
  const [isOpenNicknameModal, setIsOpenNicknameModal] = React.useState(false);
  const [certificationModalAtomState, setCertificationModalAtomState] = useRecoilState(certificationModalAtom);

  const { authAtomState } = useAuth();

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.EMPLOYER_ACCOUNT, { nickname: authAtomState.nickname }],
    queryFn: Get.employerAccountInfo,
    options: {
      throwOnError: true,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  });

  console.log('계정정보 API : ', data);

  const handleCloseModal = () => setIsOpenNicknameModal(false);

  if (isLoading) {
    return (
      <EmployerAccount>
        <SectionTitle title="계정정보" />
        <SkeletonUI.Document />
      </EmployerAccount>
    );
  }

  if (isSuccess && data) {
    return (
      <>
        {certificationModalAtomState.isOpen && <CertificationModal />}

        {isOpenNicknameModal && (
          <DynamicNoSSRModal handleCloseModal={handleCloseModal}>
            <Modal.Header title="닉네임 변경" handleCloseModal={handleCloseModal} />
            <Modal.Content>
              <NicknameForm nickname={data.result.nickname} />
            </Modal.Content>
            <Modal.Footer>
              <Button label="취소" variant="tertiary" margin="0 15px 0 0" onClick={handleCloseModal} />
              <Button label="변경" variant="primary" />
            </Modal.Footer>
          </DynamicNoSSRModal>
        )}

        <EmployerAccount data={data.result} setIsOpenNicknameModal={setIsOpenNicknameModal}>
          <SectionTitle title="계정정보" />
        </EmployerAccount>
      </>
    );
  }
}
