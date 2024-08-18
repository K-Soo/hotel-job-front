import { useEffect, useState } from "react";

export default function useWebView() {
  const [isWebView, setIsWebView] = useState(false);
  const [device, setDevice] = useState("");

  useEffect(() => {
    if (isWebView) return;
    if (typeof window === "undefined") return;

    if (window.isIOSWebView) {
      setIsWebView(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (window.navigator.userAgent.match("iPhone")) {
      setDevice("IOS");
    }
    if (window.navigator.userAgent.match("iPad")) {
      setDevice("IOS");
    }
    if (window.navigator.userAgent.match("iPod")) {
      setDevice("IOS");
    }
    if (window.navigator.userAgent.match("Android")) {
      setDevice("Android");
    }
  }, []);

  return {
    isWebView: isWebView,
    device,
  };
}
