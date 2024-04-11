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
    <BoxWrapper>
      <TitleBoxWrapper>
        <Text className="text-2xl">Contractor Full Name</Text>
      </TitleBoxWrapper>
      <ContentBoxWrapper>
        <RowWrapper>
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
        </RowWrapper>
      </ContentBoxWrapper>
    </BoxWrapper>
  );
}
