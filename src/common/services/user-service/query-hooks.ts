import type { UseMutationResult, UseQueryResult } from 'react-query';
import {
  useMutation, useQuery, useQueryClient,
} from 'react-query';

import SnackBarUtils from 'common/components/SnackBar/SnackBarUtils';

import * as api from './api';
import { QueryKey } from './query-key';

export function useGetUserPhotoDB(): UseQueryResult<Blob, Error> {
  const queryClient = useQueryClient();

  const props = {
    queryFn: api.getUserPhoto,
    options: {
      retry: 1,
      staleTime: Number.POSITIVE_INFINITY,
      cacheTime: 5 * 60 * 1000,
      initialData: (): Blob | undefined => queryClient.getQueryData(QueryKey.UserPhoto),
      onSuccess: (data: Blob) => queryClient.setQueryData(QueryKey.UserPhoto, data),
    },
  };

  return useQuery<Blob | undefined, Error, Blob, QueryKey.UserPhoto>(
    QueryKey.UserPhoto,
    props.queryFn,
    props.options,
  );
}
export const useGetUserPhoto: () => UseQueryResult<Blob | undefined, Error> = useGetUserPhotoDB;

export function useGetUserPhotoById(): UseMutationResult<Blob, Error, string, unknown> {
  return useMutation(
    (id) => api.getUserPhotoById(id),
    {
      onError: () => {
        SnackBarUtils.info('Please upload the user photo. It is important.');
      },
    },
  );
}
