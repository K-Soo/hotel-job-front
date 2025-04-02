import { Auth } from '@/apis';
import { useQueryClient } from '@tanstack/react-query';
import useLoading from '@/hooks/useLoading';
import environment from '@/environment';

export default function useSignout() {
  const { setLoadingAtomStatue } = useLoading();

  const channel = new BroadcastChannel('auth');

  const handleClickSignout = async () => {
    setLoadingAtomStatue({ isLoading: true });
    try {
      const response = await Auth.signOut();
      console.log('로그아웃 API : ', response);

      channel.postMessage({ type: 'logout' });

      window.location.href = '/sign-in';
    } catch (error) {
      console.error('로그아웃 error: ', error);
    } finally {
      setLoadingAtomStatue({ isLoading: false });
    }
  };

  return { handleClickSignout };
}
