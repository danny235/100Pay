import {useState, useCallback} from 'react';
import axios, {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';

type RequestMethod = 'get' | 'post' | 'put' | 'patch';

interface RequestState<T> {
  loading: boolean;
  data: T | null;
  error: AxiosError | any | null;
}

interface UseAxiosResponse<T> {
  request: (
    alias: string,
    method: RequestMethod,
    path: string,
    requestData?: any,
    config?: AxiosRequestConfig,
  ) => Promise<void>;
  get: (
    alias: string,
    path: string,
    config?: AxiosRequestConfig,
  ) => Promise<void>;
  post: (
    alias: string,
    path: string,
    requestData?: any,
    config?: AxiosRequestConfig,
  ) => Promise<void>;
  put: (
    alias: string,
    path: string,
    requestData?: any,
    config?: AxiosRequestConfig,
  ) => Promise<void>;
  patch: (
    alias: string,
    path: string,
    requestData?: any,
    config?: AxiosRequestConfig,
  ) => Promise<void>;
  state: {[key: string]: RequestState<T>};
}

const useAxios = <T = any>(): UseAxiosResponse<T> => {
  const [state, setState] = useState<{[key: string]: RequestState<T>}>({});
  const baseUrl = "https://api.100pay.co/api/v1";
  const request = useCallback(
    async (
      alias: string,
      method: RequestMethod,
      path: string,
      requestData: any = null,
      config: AxiosRequestConfig = {},
    ) => {
      setState(prevState => ({
        ...prevState,
        [alias]: {loading: true, data: null, error: null},
      }));

      try {
        const response: AxiosResponse<T> = await axios({
          method,
          url: `${baseUrl}${path}`,
          data: requestData,
          ...config,
        });

        setState(prevState => ({
          ...prevState,
          [alias]: {loading: false, data: response.data, error: null},
        }));
      } catch (error) {
        const axiosError = error as AxiosError;
        setState(prevState => ({
          ...prevState,
          [alias]: {loading: false, data: null, error: axiosError},
        }));
      }
    },
    [baseUrl],
  );

  const get = useCallback(
    (alias: string, path: string, config: AxiosRequestConfig = {}) => {
      return request(alias, 'get', path, null, config);
    },
    [request],
  );

  const post = useCallback(
    (
      alias: string,
      path: string,
      requestData?: any,
      config?: AxiosRequestConfig,
    ) => {
      return request(alias, 'post', path, requestData, config);
    },
    [request],
  );

  const put = useCallback(
    (
      alias: string,
      path: string,
      requestData?: any,
      config?: AxiosRequestConfig,
    ) => {
      return request(alias, 'put', path, requestData, config);
    },
    [request],
  );

  const patch = useCallback(
    (
      alias: string,
      path: string,
      requestData?: any,
      config?: AxiosRequestConfig,
    ) => {
      return request(alias, 'patch', path, requestData, config);
    },
    [request],
  );

  return {request, get, post, put, patch, state};
};

export default useAxios;
