import axios from 'axios';
import environment from '@/environment';
import { Get } from '@/apis';
import CertificationModal from '@/components/common/CertificationModal';
import { useRecoilState } from 'recoil';
import { certificationModalAtom } from '@/recoil/certification';

export default function TestPage() {
  const [certificationModalAtomState, setCertificationModalAtomState] = useRecoilState(certificationModalAtom);

  // const startCertification = async () => {
  //   try {
  //     // 백엔드에서 데이터 요청
  //     const response = await Post.startCertification();

  //     if (response.result.status !== 'success') {
  //       alert('인증 요청에 실패했습니다.');
  //       return;
  //     }
  //     // 인증 페이지로 라우팅
  //     router.push({
  //       pathname: '/certification',
  //       query: response.result.params,
  //     });
  //   } catch (error) {
  //     console.error('Error starting certification:', error);
  //   }
  // };

  return (
    <>
      {certificationModalAtomState.isOpen && <CertificationModal />}
      <button onClick={() => setCertificationModalAtomState({ isOpen: true })}>인증</button>
    </>
  );
}
