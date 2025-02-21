import CertificationModal from '@/components/common/CertificationModal';
import { useRecoilState } from 'recoil';
import { certificationModalAtom } from '@/recoil/certification';

export default function TestPage() {
  const [certificationModalAtomState, setCertificationModalAtomState] = useRecoilState(certificationModalAtom);

  return (
    <>
      {/* {certificationModalAtomState.isOpen && <CertificationModal />} */}
      {/* <button onClick={() => setCertificationModalAtomState({ isOpen: true })}>인증</button> */}
    </>
  );
}
