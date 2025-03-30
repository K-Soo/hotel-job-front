import { useRouter } from 'next/router';

export default function useRedirect() {
  const router = useRouter();

  const redirectToSignin = () => {
    const redirect = encodeURIComponent(router.asPath);
    router.push(`/sign-in?redirect=${redirect}`);
  };

  const getRedirectAfterLogin = () => {
    const redirect = router.query.redirect;
    if (typeof redirect === 'string' && redirect.startsWith('/')) {
      return decodeURIComponent(redirect);
    }
    return null;
  };

  return { redirectToSignin, getRedirectAfterLogin };
}
