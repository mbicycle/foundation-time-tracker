import type { UseQueryResult } from 'react-query';
import { useQuery, useQueryClient } from 'react-query';

import SnackBarUtils from 'common/components/SnackBar/SnackBarUtils';

import * as api from './api';
import type { Location, LocationsResponse, ProjectsResponse } from './types';

function sortByTestMonth(arr: Array<Location>): Location[] {
  return arr.sort((a, b) => {
    const monthA = parseInt(a.test_x0020_month, 2);
    const monthB = parseInt(b.test_x0020_month, 2);

    return monthA - monthB;
  });
}

export function useGraphLocations(): UseQueryResult<LocationsResponse, Error> {
  const queryClient = useQueryClient();

  return useQuery('ms-graph-locations', () => api.getLocations(), {
    staleTime: Number.POSITIVE_INFINITY,
    onSuccess: (data) => queryClient.setQueriesData('ms-graph-locations', {
      ...data,
      items: sortByTestMonth(data.items),
    }),
    initialData: () => queryClient.getQueryData('ms-graph-locations'),
    onError: (error: Error) => {
      queryClient.setQueriesData('ms-graph-locations', []);
      SnackBarUtils.error(`${error.message}.`);
    },
  });
}

export function useGraphProjets(): UseQueryResult<ProjectsResponse, Error> {
  const queryClient = useQueryClient();

  return useQuery('ms-graph-projects', () => api.getProjects(), {
    staleTime: Number.POSITIVE_INFINITY,
    onSuccess: (data) => queryClient.setQueriesData('ms-graph-projects', data),
    initialData: () => queryClient.getQueryData('ms-graph-projects'),
    onError: (error: Error) => {
      queryClient.setQueriesData('ms-graph-projects', []);
      SnackBarUtils.error(`${error.message}.`);
    },
  });
}
