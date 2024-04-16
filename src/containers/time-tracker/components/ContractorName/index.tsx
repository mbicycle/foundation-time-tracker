import React from 'react';
import type { Control, FieldErrors } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Input, Text } from '@mbicycle/foundation-ui-kit';

import type { TimeTrackingFormType } from 'containers/time-tracker/lib/types';
import {
  BoxWrapper, ContentBoxWrapper, RowWrapper, TitleBoxWrapper,
} from 'containers/time-tracker/styled';

type PropsType = {
    isShowContractorName: boolean
    control: Control<TimeTrackingFormType>
    errors: FieldErrors<TimeTrackingFormType>
}

export default function ContractorName({
  isShowContractorName, control, errors,
}: PropsType):JSX.Element | null {
  if (!isShowContractorName) return null;

  return (
    <div className="p-4 mt-8 border border-gray-200 rounded-lg relative mb-8">
      <Text className="text-2xl">Contractor Full Name</Text>
      <div className="absolute left-0 mt-3 transform -translate-y-1/2 w-full border-t border-gray-200" />
      <div className="mt-8">
        <Controller
          name="contractorName"
          control={control}
          rules={{
            required: isShowContractorName ? 'This field is required' : false,
          }}
          render={({ field }) => (
            <Input
              {...field}
              label="Full Name *"
              maxLength={255}
              error={!!errors?.contractorName}
              helperText={errors?.contractorName?.message}
            />
          )}
        />
      </div>
    </div>
  );
}
