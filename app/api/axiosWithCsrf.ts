import axios, { InternalAxiosRequestConfig, AxiosHeaders } from "axios";
import { useCsrfStore } from "@/store/useSignupStore";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SEVER_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { token, headerName } = useCsrfStore.getState();

  if (token && headerName) {
    if (!config.headers || !(config.headers instanceof AxiosHeaders)) {
      config.headers = AxiosHeaders.from({});
    }

    config.headers.set(headerName, token);
  }

  return config;
});

export default apiClient;