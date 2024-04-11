/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import type { OutlinedTextFieldProps } from '@mui/material';
import { TextField } from '@mui/material';

import type { FieldValues } from './utils/types';

interface TextFieldOutlinedControlledProps<T extends FieldValues> extends OutlinedTextFieldProps {
  control: Control<T>;
  label: string;
  type: React.InputHTMLAttributes<unknown>['type'];
  name: string;
}

const ReactHookFormTextFieldOutlined = function<T extends FieldValues> ({
  control, label, type, name, ...props
}: TextFieldOutlinedControlledProps<T | any>): JSX.Element {
  return (
    <Controller<T | FieldValues>
      control={control}
      name={name}
      key={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          value={field.value || ''}
          label={label}
          type={type}
          name={name}
          fullWidth
          error={!!error?.message}
        />
      )}
    />
  );
};

export default memo(ReactHookFormTextFieldOutlined);
