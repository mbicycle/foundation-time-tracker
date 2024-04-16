import type {
  CompensationProjectType,
  ExcelDataFull,
  ExcelDataSimple,
  FormPayload,
  TimeTrackerResponseData,
  TimeTrackingFormType,
} from './types';

export const getValidFormatDate = (month: number, year: number, forUrl = false): string => {
  const currMonth = month + 1;
  const validMonth = currMonth >= 10 ? currMonth.toString() : `0${currMonth}`;
  if (forUrl) return `${validMonth}-${year}`;
  return `${validMonth}/${year}`;
};

export const getCompletedData = (data: CompensationProjectType[]): CompensationProjectType[] | null => {
  const result = data.filter((el) => el.name !== '');
  if (result.length === 0) return null;
  return result;
};

export const getAdditionalCompensationsString = (
  compensation: CompensationProjectType[],
): string => {
  let result = '';
  for (let i = 0; i < compensation.length; i += 1) {
    result += `${compensation[i].name}: ${compensation[i].value}`;
    if (i !== compensation.length - 1) {
      result += ', ';
    }
  }
  return result;
};

export const getExcelData = (
  variant: string,
  resData: TimeTrackerResponseData[],
): ExcelDataSimple[] | ExcelDataFull[] => {
  if (variant === 'full') {
    return resData.flatMap((el) => el.projects.map((project) => ({
      'User Email': el.user_email ?? '-',
      'User Full Name': el.user_full_name ?? '-',
      'User Id': el.user_id ?? '-',
      'Project name': project.name ?? '-',
      Hours: project.value ?? '-',
      Date: el.date_month ?? '-',
      'Work on own equipment': el.equipment ? 'yes' : 'no',
      'Additional compensation': el.compensations ? getAdditionalCompensationsString(el.compensations) : '-',
      Comment: el.comment ?? '-',
    })));
  }
  return resData.flatMap((el) => el.projects.map((project) => ({
    'User Email': el.user_email ?? '-',
    'User Full Name': el.user_full_name ?? '-',
    'User Id': el.user_id ?? '-',
    'Project name': project.name ?? '-',
    Hours: project.value ?? '-',
    Date: el.date_month ?? '-',
  })));
};

export const getValidPayload = (data: TimeTrackingFormType): FormPayload => {
  const payload: FormPayload = {
    location: data.location,
    date_month: getValidFormatDate(data.month, data.year),
    equipment: data.equipment,
    comment: data.comment,
    compensations: getCompletedData(data.compensations),
    projects: getCompletedData(data.projects),
  };

  return payload;
};

export const onInputNumberCheck = (e: React.KeyboardEvent<HTMLDivElement>): void => {
  if (e.key === 'e' || e.key === 'E' || e.key === '-' || e.key === '+') {
    e.preventDefault();
  }
};

export const getSavedEquipment = (): boolean => {
  try {
    return JSON.parse((localStorage.getItem('equipment')) || 'false');
  } catch {
    return false;
  }
};

export const getSavedProjects = (): CompensationProjectType[] => {
  try {
    return JSON.parse(localStorage.getItem('projects') || '[{"name": "","value": ""}]');
  } catch {
    return [{ name: '', value: '' }];
  }
};
