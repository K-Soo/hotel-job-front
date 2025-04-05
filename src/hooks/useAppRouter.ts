import { Url } from 'next/dist/shared/lib/router/router';
import useWebView from '@/hooks/useWebView';
import { useRouter } from 'next/router';
import environment from '@/environment';

interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
  unstable_skipClientCache?: boolean;
}

export default function useAppRouter() {
  const { device, isWebView } = useWebView();
  const router = useRouter();

  const sendRouterEvent = async (params: Record<string, string | Record<string, unknown>>) => {
    window.webkit?.messageHandlers.IOSbridge.postMessage(JSON.stringify({ type: 'ROUTER_EVENT', ...params }));
  };

  const push = async (url: string, as?: Url, options?: TransitionOptions) => {
    if (!isWebView) {
      await router.push(url, as, options);
    }

    if (device === 'IOS') {
      sendRouterEvent({ path: `${environment.baseUrl}${url}` });
    }
  };

  const replace = async (url: string, as?: Url, options?: TransitionOptions) => {
    if (!isWebView) {
      await router.replace(url, as, options);
    }

    if (device === 'IOS') {
      sendRouterEvent({ path: `${environment.baseUrl}${url}` });
    }
  };

  const back = async (): Promise<void> => {
    if (!isWebView) {
      router.back();
    }
    sendRouterEvent({ path: 'back', data: {} });
  };

  return {
    push,
    replace,
    asPath: router.asPath,
    events: router.events,
    pathname: router.pathname,
    query: router.query,
    back: router.back,
  };
}
