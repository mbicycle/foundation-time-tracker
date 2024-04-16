import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { utils, writeFile } from 'xlsx';

import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { fetchWorkTimeData } from 'containers/time-tracker/lib/api';
import { months } from 'containers/time-tracker/lib/settings';
import type { DownloadEXCELFormType } from 'containers/time-tracker/lib/types';
import { getExcelData, getValidFormatDate, onInputNumberCheck } from 'containers/time-tracker/lib/utils';
import { NumberInputWrapper } from 'containers/time-tracker/styled';
import SnackBarUtils from 'common/components/SnackBar/SnackBarUtils';

import { ModalWrapperStyled } from './styled';

export function DownloadEXCELModal(
  { isOpen, toggleModal }: {isOpen: boolean, toggleModal: () => void},
): JSX.Element {
  const { handleSubmit, control, getValues } = useForm<DownloadEXCELFormType>({
    defaultValues: {
      month: dayjs().month(),
      year: dayjs().year(),
      reportVariant: 'full',
    },
  });

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
    <Modal open={isOpen} onClose={toggleModal} disableScrollLock>
      <ModalWrapperStyled>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h1" fontSize={24} fontWeight="700" paddingBottom={2}>
            Time Tracking
          </Typography>
          <Typography paddingBottom={6} fontWeight="200">
            Please specify date and report type below
          </Typography>
          <Stack flexDirection="row" gap={6} mb={6}>
            <FormControl fullWidth>
              <InputLabel id="Month">Month</InputLabel>
              <Controller
                name="month"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="Month"
                    label="Month"
                  >
                    {months.map((item) => (
                      <MenuItem key={item.name} value={item.index}>{item.name}</MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            <NumberInputWrapper>
              <Controller
                name="year"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Year"
                    type="number"
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                    onKeyDown={onInputNumberCheck}
                  />
                )}
              />
            </NumberInputWrapper>
          </Stack>
          <Stack mb={6}>
            <FormControl component="fieldset">
              <Controller
                rules={{ required: true }}
                control={control}
                name="reportVariant"
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <FormControlLabel
                      value="full"
                      control={<Radio />}
                      label="Full report"
                    />
                    <FormControlLabel
                      value="simple"
                      control={<Radio />}
                      label="Simple report"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Stack>
          <Stack flexDirection="row" justifyContent="space-between" gap={6} alignItems="center">
            <Button variant="outlined" onClick={toggleModal}>Cancel</Button>
            <Button type="submit" variant="contained">Download</Button>
          </Stack>
        </form>
      </ModalWrapperStyled>
    </Modal>
  );
}
