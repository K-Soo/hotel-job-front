import Script from 'next/script';
import environment from '@/environment';

export default function NaverAnalytics() {
  if (!environment.isProd) {
    return null;
  }

  return (
    <>
      <Script src="//wcs.naver.net/wcslog.js" strategy="afterInteractive" />

      <Script
        id="naver-wcs-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (!wcs_add) var wcs_add = {};
            wcs_add["wa"] = "s_3e011140d2ed";
            if (!_nasa) var _nasa = {};
            if (window.wcs) {
              wcs.inflow();
              wcs_do();
            }
          `,
        }}
      />
    </>
  );
}
