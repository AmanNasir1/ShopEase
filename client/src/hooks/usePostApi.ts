import {
  MutationFunction,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import api from '../ApiService/api';
import { AxiosMethodEnum } from '../constant/general.enum';

interface UsePostApiProps<D, R> {
  url: string;
  method?: AxiosMethodEnum;
  onSuccess?: (data: R) => void;
  onError?: (error: string) => void;
  showErrorMessage?: boolean;
  showSuccessMessage?: boolean;
  successMessage?: string;
  invalidate?: string[][];
}

export default function usePostApi<D, R>({
  url,
  method = AxiosMethodEnum.POST,
  onSuccess,
  onError,
  invalidate,
  showErrorMessage = true,
  showSuccessMessage,
  successMessage,
}: UsePostApiProps<D, R>): UseMutationResult<R, Error, D> {
  const queryClient = useQueryClient();

  const mutationFn: MutationFunction<R, D> = async (data?: D) => {
    const response = await api.callApi<D, R>({url, method, data});
    return response;
  };

  return useMutation<R, Error, D>({
    mutationFn,
    onSuccess: data => {
      if (showSuccessMessage || successMessage) {
        console.log(successMessage || 'Request successful');
      }

      if (invalidate?.length) {
        invalidate.forEach(queryKey => {
          queryClient.invalidateQueries({queryKey});
        });
      }

      // Call custom onSuccess if provided
      onSuccess && onSuccess(data);
    },
    onError: (error: Error) => {
      if (showErrorMessage) {
        // Show error notification
        console.error(error.message || 'Something went wrong');
      }

      // Call custom onError if provided
      onError && onError(error.message);
    },
  });
}
