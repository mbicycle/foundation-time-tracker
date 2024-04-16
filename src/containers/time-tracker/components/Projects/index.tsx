import type {
  Control, FieldErrors, UseFormRegister, UseFormSetValue,
} from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import {
  Button, Input, Select, Text,
} from '@mbicycle/foundation-ui-kit';

import { BENCH } from 'containers/time-tracker/lib/constants';
import { useProjetList } from 'containers/time-tracker/lib/hooks';
import type { TimeTrackingFormType } from 'containers/time-tracker/lib/types';
import SnackBarUtils from 'common/components/SnackBar/SnackBarUtils';

import DeleteIcon from './icon';

type PropsType = {
  control: Control<TimeTrackingFormType>
  register: UseFormRegister<TimeTrackingFormType>
  errors: FieldErrors<TimeTrackingFormType>
  setValue: UseFormSetValue<TimeTrackingFormType>
}

interface Project {
  id: string;
  name: string;
}

export function Projects({
  control, register, errors, setValue,
}: PropsType): JSX.Element {
  const {
    fields, append, remove, update,
  } = useFieldArray({
    control,
    name: 'projects',
  });

  const { error, projectList } = useProjetList();

  if (error) {
    SnackBarUtils.error('Error loading projects');
    throw new Error('Error loading projects');
  }

  const removeProject = (index: number): void => remove(index);
  const addProject = (): void => append({ name: '', value: '' });

  const onChangeHours = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const { value } = e.target;
    if (value === '') {
      setValue(`projects.${index}.value`, '');
      return;
    }
    const editValue = +value > 248 ? e.target.value.slice(0, 3) : value;
    setValue(`projects.${index}.value`, +editValue);
  };
  const option = projectList?.map((project) => ({ id: project.name, name: project.name })) || [];
  const optionList = [{ id: BENCH, name: BENCH }, ...option];

  const handleProjectChange = (selectedValue: string | string[], index: number): void => {
    const value = Array.isArray(selectedValue) ? selectedValue[0] : selectedValue;
    if (projectList) {
      update(index, { value, name: value });
    }
  };
  return (
    <div className="p-4 mt-8 border border-gray-200 rounded-lg relative">
      <Text className="text-2xl">Projects</Text>
      <div className="absolute left-0 mt-3 transform -translate-y-1/2 w-full border-t border-gray-200" />
      <div className="mt-8">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-row space-x-5 mb-5">
            <div className="w-1/2">
              <div className="flex flex-row space-x-5">
                {projectList && (
                  <div className="w-full">
                    <div className="flex flex-col">
                      <Select
                        value={field.name ?? ''}
                        label="Project"
                        options={optionList}
                        onChange={(selectedValue: string | string[]) => handleProjectChange(selectedValue, index)}
                      />
                      {errors?.projects && (
                        <div className="mt-2 text-red-500 text-sm">
                          {errors?.projects[index]?.name?.message}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-1/6">
              <div className="flex flex-col">
                <Input
                  {...register(`projects.${index}.value`, {
                    valueAsNumber: true,
                    required: 'This field is required',
                    validate: {
                      maxValue: (fieldValue) => +fieldValue <= 248 || '248 hours max',
                    },
                  })}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeHours(e, index)}
                  label="Hours *"
                  type="number"
                  min={0}
                  max={248}
                />
                {errors?.projects && (
                  <div className="mt-2 text-red-500 text-sm">
                    {errors?.projects[index]?.value?.message}
                  </div>
                )}
              </div>
            </div>
            {index > 0 && (
              <DeleteIcon
                className="h-6 w-6 mt-9 mr-20 items-center justify-center bg-transparent text-blue-500
  rounded-full hover:text-red-500 transition duration-300 ease-in-out
  transform hover:scale-110"
                onClick={() => removeProject(index)}
              />

            )}
          </div>
        ))}
        <Button
          variant="transparent"
          onClick={addProject}
          type="button"
        >
          Add a project
        </Button>
      </div>
    </div>
  );
}
