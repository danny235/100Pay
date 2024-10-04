import { useState, useCallback } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface RequestState<T> {
  loading: boolean;
  data: T | null;
  error: AxiosError | any | null;
}

interface UseGraphQLResponse<T> {
  query: (
    alias: string,
    query: string,
    variables?: any,
    headers?: AxiosRequestConfig["headers"]
  ) => Promise<void>;
  mutate: (
    alias: string,
    mutation: string,
    variables?: any,
    headers?: AxiosRequestConfig["headers"]
  ) => Promise<void>;
  state: { [key: string]: RequestState<T> };
}

const useGraphQL = <T = any>(): UseGraphQLResponse<T> => {
  const [state, setState] = useState<{ [key: string]: RequestState<T> }>({});
  const baseUrl = "https://graph.100pay.co/graphql";

  const request = useCallback(
    async (
      alias: string,
      body: string,
      variables: any = {},
      headers: AxiosRequestConfig["headers"] = {}
    ) => {
      setState((prevState) => ({
        ...prevState,
        [alias]: { loading: true, data: null, error: null },
      }));

      try {
        const response: AxiosResponse<T> = await axios({
          url: baseUrl,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...headers, // Pass the custom headers here
          },
          data: {
            query: body,
            variables,
          },
        });

        const { data, errors } = response.data as any;

        if (errors) {
          throw new Error(errors[0].message);
        }

        setState((prevState) => ({
          ...prevState,
          [alias]: { loading: false, data, error: null },
        }));
      } catch (error) {
        const axiosError = error as AxiosError;
        setState((prevState) => ({
          ...prevState,
          [alias]: { loading: false, data: null, error: axiosError },
        }));
      }
    },
    [baseUrl]
  );

  const query = useCallback(
    (
      alias: string,
      query: string,
      variables?: any,
      headers?: AxiosRequestConfig["headers"]
    ) => {
      return request(alias, query, variables, headers);
    },
    [request]
  );

  const mutate = useCallback(
    (
      alias: string,
      mutation: string,
      variables?: any,
      headers?: AxiosRequestConfig["headers"]
    ) => {
      return request(alias, mutation, variables, headers);
    },
    [request]
  );

  return { query, mutate, state };
};

export default useGraphQL;