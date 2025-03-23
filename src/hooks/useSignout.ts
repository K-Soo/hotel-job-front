import { Auth } from '@/apis';
import { useQueryClient } from '@tanstack/react-query';
import useLoading from '@/hooks/useLoading';

export default function useSignout() {
  const { setLoadingAtomStatue } = useLoading();

  const queryClient = useQueryClient();

  const handleClickSignout = async () => {
    setLoadingAtomStatue({ isLoading: true });
    try {
      const response = await Auth.signOut();
      console.log('로그아웃 API : ', response);

      window.location.href = '/sign-in';
    } catch (error) {
      console.error('로그아웃 error: ', error);
    } finally {
      setLoadingAtomStatue({ isLoading: false });
    }
  };

  return { handleClickSignout };
}
