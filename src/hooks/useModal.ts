import { modalAtom } from '@/recoil/modal';
import { useRecoilState } from 'recoil';

export default function useModal() {
  const [modalAtomState, setModalAtomState] = useRecoilState(modalAtom);

  return { modalAtomState, setModalAtomState };
}
