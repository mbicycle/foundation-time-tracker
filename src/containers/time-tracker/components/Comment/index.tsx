import { useState } from 'react';
import type { Control, UseFormSetValue } from 'react-hook-form';
import { Input, Text } from '@mbicycle/foundation-ui-kit';

import type { TimeTrackingFormType } from 'containers/time-tracker/lib/types';

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
    <div className="p-4 mt-8 border border-gray-200 rounded-lg relative mb-8">
      <Text className="text-2xl">Comment</Text>
      <div className="absolute left-0 mt-3 transform -translate-y-1/2 w-full border-t border-gray-200" />
      <div className="mt-8">
        <Input
          name="comment"
          multiline
          placeholder="Type your comment here..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          type="text"
          maxLength={CHARACTER_LIMIT}
          value={comment}
          onChange={onChangeCommentHandle}
        />
        <div className="flex justify-end mt-2">
          <Text>{`${comment.length}/${CHARACTER_LIMIT}`}</Text>
        </div>
      </div>
    </div>
  );
}
