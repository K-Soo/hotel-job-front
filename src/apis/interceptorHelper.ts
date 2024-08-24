import { AxiosResponse } from "axios";
import { instance } from "@/apis";

const ALLOW_AUTHENTICATION_PATH = ["/auth/sign-in", "/auth/kakao/callback"];

const handleSuccessResponse = (config: AxiosResponse) => {
  if (!config.config?.url) {
    return;
  }

  console.log("config: ", config);
  if (ALLOW_AUTHENTICATION_PATH.includes(config.config.url)) {
    const accessToken = config.data?.result?.accessToken;
    console.log("accessToken: ", accessToken);
    if (!accessToken) {
      throw new Error("Access token is missing");
    }
    if (accessToken) {
      instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
  }
};

export const interceptorHelper = { handleSuccessResponse };
