import { useSetRecoilState } from 'recoil';
import { alertWithConfirmAtom } from '@/recoil/alertWithConfirm';

export default function useAlertWithConfirm() {
  const setAlertWithConfirmAtom = useSetRecoilState(alertWithConfirmAtom);

  return { setAlertWithConfirmAtom };
}
