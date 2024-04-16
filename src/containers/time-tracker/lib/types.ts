type LocationField = {
  Country: string,
  Normaltiming: number,
  Month: string,
  Year: string,
  id: string,
}

export type Location = {
  contentType: {
    id: string,
    name: string
  }
  // eslint-disable-next-line camelcase
  test_x0020_month: string;
  createdDateTime: string
  eTag: string
  fields: LocationField
  id: string
  lastModifiedDateTime: string
  parentReference: {
    id: string,
    siteId: string
  }
  webUrl: string
}

export type LocationsResponse = {
  id: string
  items: Array<Location>
  name: string
}

type UserType = {
  displayName: string
  email: string
  id: string
}

type ProjectFieldType = {
  Company: string
  Relatessalesmanager: string
  Title: string
  id: string
}

type ProjectType = {
  contentType: {
    id: string,
    name: string
  }
  createdBy: {
    user: UserType
  }
  createdDateTime: string
  eTag: string
  fields: ProjectFieldType
  id: string
  lastModifiedBy: {
    user: UserType
  }
  lastModifiedDateTime: string
  parentReference: {
    id: string,
    siteId: string
  }
  webUrl: string
}

export type ProjectsResponse = {
  createdBy: {
    user: UserType
  }
  createdDateTime: string
  description: string
  displayName: string
  eTag: string
  id: string
  items: Array<ProjectType>
  lastModifiedBy: {
    user: UserType
  }
  lastModifiedDateTime: string
  list: {
    contentTypesEnabled: boolean
    hidden: boolean
    template: string
  }
  name: string
  parentReference: {
    siteId: string
  }
  webUrl: string
}

export type CompensationProjectType = {
  name: string,
  value: number | string,
}

export type TimeTrackingFormType = {
  month: number,
  year: number,
  location: string,
  monthHours: number | string | undefined,
  equipment: boolean,
  comment: string,
  compensations: CompensationProjectType[],
  projects: CompensationProjectType[],
  contractorName: string
}

export type DownloadEXCELFormType = {
  month: number,
  year: number,
  reportVariant: string
}

export type TimeTrackerPayload = {
  location: string,
  'date_month': string,
  equipment: boolean,
  comment: string,
  compensations: CompensationProjectType[] | null,
  projects: CompensationProjectType[] | null,
}

export type TimeTrackerResponseData = {
  'user_id': string,
  'user_email': string,
  'user_full_name': string,
  location: string,
  'date_month': string,
  projects: CompensationProjectType[],
  equipment: boolean,
  comment: string,
  compensations: CompensationProjectType[],
}

export type ExcelDataFull = {
  'User Email': string;
  'User Full Name': string;
  'User Id': string;
  'Project name': string;
  Hours: number | null | string;
  Date: string;
  'Work on own equipment': boolean | string;
  'Additional compensation': string;
  Comment: string;
}

export type ExcelDataSimple = {
  'User Email': string;
  'User Full Name': string;
  'User Id': string;
  'Project name': string;
  Hours: number | null | string;
  Date: string;
}

export type FormPayload = {
  location: string;
  date_month: string;
  equipment: boolean;
  comment: string;
  compensations: CompensationProjectType[] | null;
  projects: CompensationProjectType[] | null;
  user_full_name?: string
}

export type ProjectList = {
  error: Error | null
  projectList: {
    name: string;
    id: string;
  }[] | undefined
}
