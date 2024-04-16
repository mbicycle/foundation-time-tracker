import React, { useMemo } from 'react';
import type {
  Control, FieldErrors, UseFormSetValue, UseFormWatch,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Input, Select, Text } from '@mbicycle/foundation-ui-kit';

import { useGraphLocations } from 'containers/time-tracker/lib/query-hooks';
import { months } from 'containers/time-tracker/lib/settings';
import type { LocationsResponse, TimeTrackingFormType } from 'containers/time-tracker/lib/types';
import SnackBarUtils from 'common/components/SnackBar/SnackBarUtils';

type PropsType = {
  control: Control<TimeTrackingFormType>
  setValue: UseFormSetValue<TimeTrackingFormType>
  watch: UseFormWatch<TimeTrackingFormType>
  errors: FieldErrors<TimeTrackingFormType>
}

function countrySet(locations: LocationsResponse | undefined): Set<string> | undefined {
  if (!locations) return undefined;
  const uniqueCountries = new Set<string>();

  locations?.items?.forEach((location) => {
    uniqueCountries.add(location.fields.Country);
  });

  return uniqueCountries;
}

export function Locations({
  control, setValue, watch, errors,
}: PropsType): JSX.Element | null {
  const { data, error, isLoading } = useGraphLocations();

  const year = watch('year');
  const month = watch('month');
  const location = watch('location');

  const filteredData = useMemo((): LocationsResponse => {
    const filteredItems = data?.items
      .filter((item) => +item.fields.Year === year)
      .filter((item) => item.fields.Month === months[month].name);

    return { ...data, items: filteredItems ?? [] } as LocationsResponse;
  }, [data, month, year]);

  const minYear = filteredData.items.reduce((min, item) => Math.min(min, +item.fields.Year), Infinity);
  const maxYear = filteredData.items.reduce((min, item) => Math.max(min, +item.fields.Year), Infinity);

  const countries = countrySet(filteredData);

  const changeLocationHandle = (value: string | string[]): void => {
    setValue('location', value as string);
    const currentLocation = filteredData?.items.find(
      (item) => item.fields.Country === value,
    );
    setValue('monthHours', currentLocation?.fields.Normaltiming);
  };

  const option = months.map(({ index, name }) => ({ id: index.toString(), name }));

  const countryList = Array.from(countries ?? [])?.map((country) => ({ id: country, name: country }));

  const changeMonthHandle = (value: string | string[]): void => {
    setValue('month', +value);
    setValue('location', '');
    setValue('monthHours', '');
  };

  const changeYearHandle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue('year', +event.target.value);
    setValue('location', '');
    setValue('monthHours', '');
  };

  if (isLoading) return null;

  if (error) {
    SnackBarUtils.error('Error loading location');
    throw new Error('Error loading location');
  }

  return (
    <div className="p-4 border border-gray-200 rounded-lg relative">
      <Text className="text-2xl">Date & Location</Text>
      <div className="absolute left-0 mt-3 transform -translate-y-1/2 w-full border-t border-gray-200" />
      <div className="flex flex-row space-x-5 mb-6 mt-8">
        <div className="w-1/2">
          <Controller
            name="month"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                id="Month"
                label="Month"
                value={month.toString()}
                options={option}
                onChange={changeMonthHandle}
              />
            )}
          />
        </div>
        <div className="w-1/6">
          <Controller
            name="year"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeYearHandle(event)}
                label="Year"
                type="number"
                min={minYear}
                max={maxYear}
              />
            )}
          />
        </div>
      </div>
      <div className="flex flex-row space-x-5 mb-2">
        {data && (
          <div className="w-1/2">
            <div className="flex flex-col">
              <Controller
                name="location"
                control={control}
                rules={{
                  required: 'This field is required',
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="Location"
                    label="Location"
                    value={location}
                    options={countryList}
                    onChange={changeLocationHandle}
                  />
                )}
              />
              {errors?.location && <div className="mt-2 text-red-500 text-sm">{errors.location.message}</div>}
            </div>
          </div>
        )}
        <div className="w-1/6">
          <Controller
            name="monthHours"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Hours"
                type="number"
                disabled
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
