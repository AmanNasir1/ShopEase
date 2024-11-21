import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  GenericAbortSignal,
  AxiosError,
} from "axios";
import { createDynamicUrl } from "../utils/helper/general-helper";
import { AxiosMethodEnum, HttpStatusEnum } from "../constant/general.enum";

export default class HTTP {
  static instance: AxiosInstance;
  token = "";

  constructor(abortSignal?: GenericAbortSignal) {
    if (!HTTP.instance) {
      HTTP.instance = axios.create({
        baseURL: "http://localhost:3000",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
          "ngrok-skip-browser-warning": true,
        },
        signal: abortSignal,
      }); // Create a new instance of axios
    }
  }

  async refreshInstance() {
    const token = await localStorage.getItem("authToken");

    HTTP.instance = axios.create({
      baseURL: "http://localhost:3000",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": true,
      },
    });
  }

  applyInterceptors<T, D>() {
    HTTP.instance.interceptors.request.use(async (config) => {
      const local_token = await localStorage.getItem("authToken");
      if (local_token) {
        config.headers["authorization"] = `Bearer ${local_token}`;
      }
      return config;
    });
    HTTP.instance.interceptors.response.use(
      (response: AxiosResponse<{ [key: string]: T }, { [key: string]: D }>) => {
        return response;
      },
      async (error: AxiosError) => {
        const { status, config } = error?.response ?? error;

        const original_request = config;

        /** UnAuthorized User Handler */
        if (
          status === HttpStatusEnum.UNAUTHORIZED &&
          original_request &&
          !original_request.url?.includes("login")
        ) {
          /** Define property for limit loop */
          Object.defineProperty(original_request, "_retry", {
            value: true,
            writable: true,
            enumerable: true,
            configurable: true,
          });

          // const local_refreshToken = await localStorage.getItem(
          //   STORAGE_KEYS.AUTH.REFRESH_TOKEN
          // );
          // const local_accessToken = await localStorage.getItem("authToken");
          /** fetching a GET request for refresh token BUT you can use POST */
          // const refresh_response = await fetch(
          //   "http://localhost:3000" + "/auth/refresh-token",
          //   {
          //     method: "POST",
          //     headers: {
          //       Authorization: "Bearer " + local_accessToken,
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({ refreshToken: local_refreshToken }),
          //   }
          // );
          // if (
          //   refresh_response.status === HttpStatusEnum.OK ||
          //   refresh_response.status === HttpStatusEnum.CREATED
          // ) {
          //   const { accessToken, refreshToken } = await refresh_response.json();
          //   /** setting up new tokens */
          //   await localStorage.setItem(
          //     STORAGE_KEYS.AUTH.AUTH_TOKEN,
          //     accessToken
          //   );
          //   await localStorage.setItem(
          //     STORAGE_KEYS.AUTH.REFRESH_TOKEN,
          //     refreshToken
          //   );
          //   this.refreshInstance();
          //   original_request.headers["authorization"] = `Bearer ${accessToken}`;
          //   const original_request_response = await HTTP.instance(
          //     original_request
          //   );
          //   return original_request_response;
          // } else {
          //   await localStorage.removeItem(STORAGE_KEYS.AUTH.AUTH_TOKEN);
          //   await localStorage.removeItem(STORAGE_KEYS.AUTH.REFRESH_TOKEN);
          //   window.location.href = `/`;
          // }
        }

        return error;
      }
    );
  }

  async call<T, R>({
    url,
    method = AxiosMethodEnum.GET,
    body,
    config,
    query,
  }: {
    url: string;
    method?: AxiosMethodEnum;
    body?: T;
    config?: AxiosRequestConfig;
    query?: Record<string, unknown>;
  }): Promise<AxiosResponse<R, T>> {
    let _url: string = url;
    if (query) _url = createDynamicUrl(url, query);
    this.applyInterceptors();
    return await HTTP.instance[method](
      _url,
      method === AxiosMethodEnum.GET ? config : body,
      config
    );
  }
}
