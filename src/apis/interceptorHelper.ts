import { AxiosResponse } from "axios";
import { instance } from "@/apis";

const ALLOW_AUTHENTICATION_PATH = ["/auth/sign-in"];

const handleSuccessResponse = (config: AxiosResponse) => {
  if (!config.config?.url) {
    return;
  }
  if (ALLOW_AUTHENTICATION_PATH.includes(config.config.url)) {
    const accessToken = config.data?.result?.accessToken;
    if (!accessToken) {
      throw new Error("Access token is missing");
    }
    if (accessToken) {
      console.log("accessToken: ", accessToken);
      instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
  }
};

export const interceptorHelper = { handleSuccessResponse };
