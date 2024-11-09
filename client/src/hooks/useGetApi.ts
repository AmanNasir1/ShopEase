import {useQuery, UseQueryResult, QueryKey} from '@tanstack/react-query';
import api from '../ApiService/api';

interface UseGetApiProps<R> {
  key: QueryKey;
  url: string;
  params?: Record<string, any>;
  enabled?: boolean;
  options?: Record<string, any>;
}

export default function useGetApi<R>({
  key,
  url,
  params,
  enabled = true,
  options = {},
}: UseGetApiProps<R>): UseQueryResult<R, Error> {
  return useQuery<R, Error>({
    queryKey: key,
    queryFn: async () => {
      const response = await api.callApi<undefined, R>({
        url,
        method: 'get',
        params,
      });
      return response;
    },
    enabled,
    refetchOnWindowFocus: false,
    retry: 3,
    ...options,
  });
}
