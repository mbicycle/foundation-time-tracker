import React from 'react';
import type { Control, UseFormRegister } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { Button, Input, Text } from '@mbicycle/foundation-ui-kit';

import DeleteIcon from 'containers/time-tracker/components/Projects/icon';
import type { TimeTrackingFormType } from 'containers/time-tracker/lib/types';

type PropsType = {
  control: Control<TimeTrackingFormType>
  register: UseFormRegister<TimeTrackingFormType>
}

export function Compensations({ control, register }: PropsType): JSX.Element {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'compensations',
  });

  const addNewCompensation = (): void => append({ name: '', value: '' });
  const removeCompensation = (index: number): void => remove(index);
  const onEnterAmount = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (e.key === 'e' || e.key === 'E' || e.key === '-' || e.key === '+') {
      e.preventDefault();
    }
  };

  return (
    <div className="p-4 mt-8 border border-gray-200 rounded-lg relative">
      <Text className="text-2xl">Compensations</Text>
      <div className="absolute left-0 mt-3 transform -translate-y-1/2 w-full border-t border-gray-200" />
      <div className="mt-8">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-row gap-5 mb-5">
            <div className="w-1/2">
              <div className="w-full">
                <Input
                  label={`Compensation ${index + 1}`}
                  maxLength={255}
                  {...register(`compensations.${index}.name`)}
                />
              </div>
            </div>
            <div className="w-1/6">
              <Input
                type="number"
                label="Amount($)"
                min={0}
                onKeyDown={onEnterAmount}
                {...register(`compensations.${index}.value`, {
                  valueAsNumber: true,
                })}
              />
            </div>
            {
              index > 0 && (
                <DeleteIcon
                  className="h-6 w-6 mt-9 mr-20 items-center justify-center bg-transparent text-blue-500
  rounded-full hover:text-red-500 transition duration-300 ease-in-out
  transform hover:scale-110"
                  onClick={() => removeCompensation(index)}
                />
              )
            }
          </div>
        ))}
        <div className="flex flex-row items-center mt-4 mb-2">
          <input
            type="checkbox"
            id="equipment"
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            {...register('equipment')}
          />
          <Text className="ml-3">Work on own equipment</Text>
        </div>
        <Button
          className="mt-4"
          variant="transparent"
          onClick={addNewCompensation}
        >
          Add a compensation
        </Button>
      </div>
    </div>
  );
}
