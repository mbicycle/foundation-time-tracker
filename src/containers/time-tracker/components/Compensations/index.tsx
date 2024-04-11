import React from 'react';
import type { Control, UseFormRegister } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { Button, Input, Text } from '@mbicycle/foundation-ui-kit';

import type { TimeTrackingFormType } from 'containers/time-tracker/lib/types';
import {
  BoxWrapper, ContentBoxWrapper, NumberInputWrapper, RowWrapper, TitleBoxWrapper,
} from 'containers/time-tracker/styled';

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
    <BoxWrapper>
      <TitleBoxWrapper>
        <Text>Compensations</Text>
      </TitleBoxWrapper>
      <ContentBoxWrapper>
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-row gap-5 mb-5">
            <RowWrapper>
              <div className="flex flex-row gap-5">
                <Input
                  label={`Compensation ${index + 1}`}
                  maxLength={255}
                  {...register(`compensations.${index}.name`)}
                />
                <NumberInputWrapper>
                  <Input
                    type="number"
                    label="Amount($)"
                    min={0}
                    onKeyDown={onEnterAmount}
                    {...register(`compensations.${index}.value`, {
                      valueAsNumber: true,
                    })}
                  />
                </NumberInputWrapper>
              </div>
            </RowWrapper>
            {
              index > 0 && (
                <Button className="w-12 h-12 bg-red-500 text-white rounded-full" onClick={() => removeCompensation(index)}>
                  Delete
                </Button>
              )
            }
          </div>
        ))}
        <div className="flex flex-row items-center -mt-2 mb-2">
          <input
            type="checkbox"
            id="equipment"
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            {...register('equipment')}
          />
        </div>
        <Button
          variant="transparent"
          onClick={addNewCompensation}
        >
          Add a compensation
        </Button>
      </ContentBoxWrapper>
    </BoxWrapper>
  );
}
