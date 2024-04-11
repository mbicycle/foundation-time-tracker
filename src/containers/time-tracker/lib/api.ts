import type { AxiosError, AxiosResponse } from 'axios';
import { graph } from 'shared/utils/interceptors';
import { timeTrackerInstance } from 'shared/utils/interceptors/axios';

import type {
  LocationsResponse, ProjectsResponse, TimeTrackerPayload, TimeTrackerResponseData,
} from './types';

export const getLocations = async (): Promise<LocationsResponse> => new Promise<LocationsResponse>(
  (resolve, reject) => {
    // eslint-disable-next-line max-len
    graph.graphClient.api('/sites/93c44b10-11ba-4212-8a79-bd8b60b8df73/lists/282e06a7-4e24-4a5c-a6da-bdd1f2263e63?select=id,name&expand=items(expand=fields(select=Country,Month,Year,Normaltiming,id,test_x0020_month))')
      .get()
      .then((response: LocationsResponse) => resolve(response))
      .catch((error) => reject(error));
  },
);

export const getProjects = async (): Promise<ProjectsResponse> => new Promise<ProjectsResponse>(
  (resolve, reject) => {
    // eslint-disable-next-line max-len
    graph.graphClient.api('/sites/93c44b10-11ba-4212-8a79-bd8b60b8df73/lists/7ef21964-9408-40b1-92ed-6f1d694b2b65?expand=items(expand=fields(select=Title,Relatessalesmanager,Company,id))')
      .get()
      .then((response: ProjectsResponse) => resolve(response))
      .catch((error) => reject(error));
  },
);

export const sendWorkTimeData = async (
  payload: TimeTrackerPayload,
): Promise<AxiosResponse<TimeTrackerResponseData>> => new Promise<AxiosResponse<TimeTrackerResponseData>>(
  (resolve, reject) => {
    timeTrackerInstance.post('record', { ...payload })
      .then((response: AxiosResponse<TimeTrackerResponseData>) => resolve(response))
      .catch((error: AxiosError) => reject(error));
  },
);

export const fetchWorkTimeData = async (
  date = '',
): Promise<AxiosResponse<TimeTrackerResponseData[]>> => new Promise<AxiosResponse<TimeTrackerResponseData[]>>(
  (resolve, reject) => {
    timeTrackerInstance.get(`record/${date}`)
      .then((response: AxiosResponse<TimeTrackerResponseData[]>) => resolve(response))
      .catch((error: AxiosError) => reject(error));
  },
);
