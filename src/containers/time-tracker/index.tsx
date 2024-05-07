import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Button, Text } from '@mbicycle/foundation-ui-kit';
import { HttpStatusCode } from 'axios';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';

import RenderOnRole from 'common/components/render-on-role/RenderOnRole';

import { Comment } from './components/Comment';
import { Compensations } from './components/Compensations';
import ContractorName from './components/ContractorName';
import { Locations } from './components/Locations';
import { Projects } from './components/Projects';
import { sendWorkTimeData } from './lib/api';
import type { TimeTrackingFormType } from './lib/types';
import { getSavedEquipment, getSavedProjects, getValidPayload } from './lib/utils';

function TimeTracker(): JSX.Element {
  const [isShowContractorName, setIsShowContractorName] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    control,
    register,
    watch,
    setValue,
    formState: {
      errors, isValid, isSubmitting, submitCount,
    },
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
    <div className="w-full h-full flex flex-col justify-center items-center pl-20 pr-20 pt-5 pb-5 relative">
      <RenderOnRole roles={['admin', 'god']}>
        <div className="flex item-end w-[45vw] justify-end">
          <Button
            variant="transparent"
            onClick={onShowContractorField}
          >
            Track Time For...
          </Button>
        </div>
      </RenderOnRole>
      <form className="min-w-[45vw]" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <Text className="text-2xl">
            Time Tracking
          </Text>
          <Text className="mt-2 mb-3">
            Fulfill your monthly worklog and do not forget to specify your compensations if any
          </Text>
        </div>
        <ContractorName isShowContractorName={isShowContractorName} control={control} errors={errors} />
        <Locations control={control} watch={watch} setValue={setValue} errors={errors} />
        <Projects control={control} register={register} errors={errors} setValue={setValue} />
        <Compensations control={control} register={register} />
        <Comment control={control} setValue={setValue} />
        <div className="flex flex-row-reverse">
          <Button
            disabled={!isValid}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TimeTracker;
