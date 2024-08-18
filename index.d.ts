declare global {
  interface Window {
    webkit?: Webkit;
    isIOSWebView: boolean;
  }
}

type TEventTypes = "SIGN_OUT" | "SIGN_UP" | "ROUTER_EVENT";
interface Webkit {
  messageHandlers: {
    IOSbridge: {
      postMessage: any;
    };
  };
}

export type PostMessageTypes = ({ type, message }: { type: string; message: any }) => void;
