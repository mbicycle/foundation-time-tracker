import { useState } from 'react';
import type { Control, UseFormSetValue } from 'react-hook-form';
import { Input, Text } from '@mbicycle/foundation-ui-kit';

import FormHelperText from '@mui/material/FormHelperText';

import type { TimeTrackingFormType } from 'containers/time-tracker/lib/types';
import { BoxWrapper, ContentBoxWrapper, TitleBoxWrapper } from 'containers/time-tracker/styled';

type PropsType = {
    control: Control<TimeTrackingFormType>
    setValue: UseFormSetValue<TimeTrackingFormType>
}

export function Comment({ control, setValue }: PropsType): JSX.Element {
  const CHARACTER_LIMIT = 300;
  const [comment, setComment] = useState('');

  const onChangeCommentHandle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setValue('comment', event.target.value);
    setComment(event.target.value);
  };

  return (
    <BoxWrapper>
      <TitleBoxWrapper>
        <Text>Comment</Text>
      </TitleBoxWrapper>
      <ContentBoxWrapper>
        <Input
          name="comment"
          placeholder="Type your comment here..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          type="text"
          maxLength={CHARACTER_LIMIT}
          value={comment}
          onChange={onChangeCommentHandle}
        />
        <div className="flex justify-end mt-2">
          <FormHelperText>{`${comment.length}/${CHARACTER_LIMIT}`}</FormHelperText>
        </div>
      </ContentBoxWrapper>
    </BoxWrapper>
  );
}
