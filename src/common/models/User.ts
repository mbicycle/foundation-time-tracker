export interface Project {
  id: string;
  title: string;
  role: string;
  from: string;
  to: string;
  link: string;
  description: string;
  responsibilities: string[];
  teamSize: number;
  categories: string[];
}

export interface Certificate {
  link: string;
  name: string;
  id: string;
  date: Date;
  defaultName?: string;
}

export interface MsUser {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  businessPhones: any[];
  displayName: string;
  givenName: string;
  jobTitle: string;
  mail: string;
  mobilePhone: string;
  officeLocation: string;
  preferredLanguage: string;
  surname: string;
  userPrincipalName: string;
  id: string;
}
