import useToast from '@/hooks/useToast';
import { useRouter } from 'next/router';

interface IUseShare {
  title: string;
}

// TODO - 웹뷰 분기처리 로직 추가
export default function useShare({ title: receivedTitle }: IUseShare) {
  const { addToast } = useToast();
  const router = useRouter();

  const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}${router.asPath}` : '';

  const handleClickShare = async () => {
    try {
      if (navigator.share) {
        return await navigator.share({
          title: receivedTitle,
          url: currentUrl,
        });
      }
      await navigator.clipboard.writeText(currentUrl);
      addToast({ message: '복사되었습니다.', type: 'info' });
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return { handleClickShare };
}
