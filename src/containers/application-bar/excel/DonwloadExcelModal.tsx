import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import {
  Button, Input, Modal, Select, Text,
} from '@mbicycle/foundation-ui-kit';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { utils, writeFile } from 'xlsx';

import { fetchWorkTimeData } from 'containers/time-tracker/lib/api';
import { months } from 'containers/time-tracker/lib/settings';
import type { DownloadEXCELFormType } from 'containers/time-tracker/lib/types';
import { getExcelData, getValidFormatDate } from 'containers/time-tracker/lib/utils';
import SnackBarUtils from 'common/components/SnackBar/SnackBarUtils';

export function DownloadEXCELModal(
  { isOpen, toggleModal }: {isOpen: boolean, toggleModal: () => void},
): JSX.Element {
  const {
    handleSubmit, control, getValues, setValue, watch,
  } = useForm<DownloadEXCELFormType>({
    defaultValues: {
      month: dayjs().month(),
      year: dayjs().year(),
      reportVariant: 'full',
    },
  });

  const Target = watch('reportVariant');

  const option = months.map(({ index, name }) => ({ id: index.toString(), name }));
  const hendleChekboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.currentTarget;
    const { value } = event.currentTarget;
    if (checked && value === 'full') {
      setValue('reportVariant', 'full');
    } else {
      setValue('reportVariant', 'simple');
    }
  };
  const changeMonthHandle = (value: string | string[]): void => {
    setValue('month', +value);
  };

  const onSubmit: SubmitHandler<DownloadEXCELFormType> = async (data) => {
    const date = getValidFormatDate(data.month, data.year, true);
    const nameReport = getValues('reportVariant') === 'full' ? 'FullTimeReport' : 'SimpleTimeReport';
    const month = months[getValues('month')].name;

    try {
      const res = await fetchWorkTimeData(date);
      const result = getExcelData(data.reportVariant, res.data);

      const wb = utils.book_new();
      const ws = utils.json_to_sheet(result);

      utils.book_append_sheet(wb, ws, 'TimeReport');
      writeFile(wb, `${nameReport}_${month}.${getValues('year')}.xlsx`);
    } catch (error) {
      if (error instanceof AxiosError) {
        SnackBarUtils.error(error?.message);
      } else SnackBarUtils.error('Something went wrong...');
    }
  };

  return (
    <Modal open={isOpen} onClose={toggleModal}>
      <div className="p-1 w-[30vw]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <Text className="text-2xl mb-4">Time Tracking</Text>
            <Text className="mb-4">Please specify date and report type below</Text>
          </div>
          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-1/2 pr-5">
              <Controller
                name="month"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="Month"
                    label="Month"
                    value={field.value.toString()}
                    options={option}
                    onChange={changeMonthHandle}
                  />
                )}
              />
            </div>
            <div className="w-full md:w-1/2">
              <Controller
                name="year"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Year"
                    type="number"
                  />
                )}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col">
            <div>
              <input
                type="checkbox"
                value="full"
                onChange={hendleChekboxChange}
                checked={Target === 'full'}
                className="mr-2"
              />
              <Text>Full Report</Text>
            </div>
            <div>
              <input
                type="checkbox"
                value="simple"
                onChange={hendleChekboxChange}
                checked={Target === 'simple'}
                className="mr-2"
              />
              <Text>Simple Report</Text>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="button" variant="transparent" onClick={toggleModal} className="mr-2">Cancel</Button>
            <Button type="submit">Download</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
