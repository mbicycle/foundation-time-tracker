import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { HttpStatusCode } from 'axios';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';

import { Button, Stack, Typography } from '@mui/material';

import RenderOnRole from 'common/components/render-on-role/RenderOnRole';

import { Comment } from './components/Comment';
import { Compensations } from './components/Compensations';
import ContractorName from './components/ContractorName';
import { Locations } from './components/Locations';
import { Projects } from './components/Projects';
import { sendWorkTimeData } from './lib/api';
import type { TimeTrackingFormType } from './lib/types';
import { getSavedEquipment, getSavedProjects, getValidPayload } from './lib/utils';
import { MainWrapperStyled } from './styled';

function TimeTracker(): JSX.Element {
  const [isShowContractorName, setIsShowContractorName] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    control,
    register,
    watch,
    setValue,
    formState: { errors, isValid },
    resetField,
  } = useForm<TimeTrackingFormType>({
    mode: 'all',
    defaultValues: {
      month: dayjs().month(),
      year: dayjs().year(),
      location: '',
      monthHours: '',
      equipment: getSavedEquipment(),
      comment: '',
      compensations: [
        { name: '', value: '' },
      ],
      projects: getSavedProjects(),
      contractorName: '',
    },
  });

  const onSubmit: SubmitHandler<TimeTrackingFormType> = async (data) => {
    const payload = getValidPayload(data);

    if (data.contractorName !== '') {
      payload.user_full_name = data.contractorName;
    }

    const savingProjects = data.projects.map((project) => ({ name: project.name, value: '' }));
    localStorage.setItem('equipment', JSON.stringify(data.equipment));
    localStorage.setItem('projects', JSON.stringify(savingProjects));

    try {
      const res = await sendWorkTimeData(payload);
      if (res.status === HttpStatusCode.Created) {
        enqueueSnackbar('Sent successfully', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        });
      }
    } catch (error) {
      enqueueSnackbar((error as Error).message, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
    }
  };

  const onShowContractorField = (): void => {
    setValue('contractorName', '');
    resetField('contractorName');
    setIsShowContractorName(!isShowContractorName);
  };

  return (
    <MainWrapperStyled>
      <RenderOnRole roles={['admin', 'god']}>
        <Stack flexDirection="row-reverse">
          <Button
            variant="outlined"
            onClick={onShowContractorField}
          >
            Track Time For...
          </Button>
        </Stack>
      </RenderOnRole>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h1" fontSize={24} fontWeight="700" paddingBottom={2}>
          Time Tracking
        </Typography>
        <Typography paddingBottom={6} fontWeight="200">
          Fulfill your monthly worklog and do not forget to specify your compensations if any
        </Typography>
        <ContractorName isShowContractorName={isShowContractorName} control={control} errors={errors} />
        <Locations control={control} watch={watch} setValue={setValue} errors={errors} />
        <Projects control={control} register={register} errors={errors} setValue={setValue} />
        <Compensations control={control} register={register} />
        <Comment control={control} setValue={setValue} />
        <Stack flexDirection="row-reverse">
          <Button type="submit" variant="contained" disabled={!isValid}>Submit</Button>
        </Stack>
      </form>
    </MainWrapperStyled>
  );
}

export default TimeTracker;
