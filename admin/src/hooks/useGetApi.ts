import {
  UseQueryResult,
  useQuery,
  QueryFunction,
  QueryKey,
  QueryClient,
  UndefinedInitialDataOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { notification } from "./useApp";
import api from "../service/http.service";

type UseGetApi<R> = {
  key: QueryKey;
  url: string;
  options?: Omit<
    UndefinedInitialDataOptions<
      unknown,
      AxiosError<{ message: string }>,
      R,
      QueryKey
    >,
    "queryKey" | "queryFn" | "enabled"
  >;
  customQueryFn?: QueryFunction;
  enabled?: boolean;
  query?: Record<string, unknown>;
  queryClient?: QueryClient;
  showErrorMessage?: boolean | string;
};

const _api = new api();
export default function useGetApi<R>({
  key,
  url,
  enabled = true,
  query,
  options,
  queryClient,
  showErrorMessage = false,
}: UseGetApi<R>): UseQueryResult<R, AxiosError<{ message: string }>> {
  return useQuery(
    {
      queryKey: key,
      queryFn: async () => {
        try {
          const response = await _api.call<undefined, R>({
            url,
            query,
          });

          if (showErrorMessage && response instanceof AxiosError) {
            notification.error({
              message: "Error",
              description:
                typeof showErrorMessage === "string"
                  ? showErrorMessage
                  : response?.response?.data.message,
              placement: "bottomRight",
            });
          }
          return Promise.resolve(response.data);
        } catch (error) {
          return Promise.reject(error);
        }
      },
      // throwOnError:(error,query) => {
      //   if (import.meta.env.DEV) {
      //     notification.error({
      //       message:error.config?.url ?? url,
      //       description:error.message,
      //       placement:"bottomLeft"
      //     })
      //   }
      // },

      refetchOnWindowFocus: false,
      retry: 3,
      gcTime: 1000 * 60 * 5,
      enabled,

      ...options,
    },
    queryClient
  );
}

// queryFn: customQueryFn
//       ? customQueryFn
//       : async () => {
//           const response = await _api.call<
//             D,
//             R & { totalCount: number | undefined }
//           >({ url, query });
//           return response.data?.totalCount ? response : response.data;
//         },
//     ...{
//       refetchOnWindowFocus: false,
//       cacheTime: 1000 * 60 * 5,
//       retry: 3,
//       ...options,
//     },
