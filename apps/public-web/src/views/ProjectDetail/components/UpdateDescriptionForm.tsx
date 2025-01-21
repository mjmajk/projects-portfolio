'use client';

import React, { useActionState, useEffect } from 'react';
import {
  handleProjectUpdateOnServer,
  HandleProjectUpdateOnServerState,
} from '../../../actions/update-project-description';
import { twMerge } from 'tailwind-merge';
import { toast } from 'react-toastify';

const initialState: HandleProjectUpdateOnServerState = {
  message: '',
  type: 'error',
};

export const UpdateDescriptionForm = ({
  projectId,
  description,
}: {
  projectId: number;
  description: string;
}) => {
  const [state, formAction, pending] = useActionState(
    handleProjectUpdateOnServer,
    initialState
  );

  useEffect(() => {
    if (state.message) {
      toast(state.message, { type: state.type });
    }
  }, [state.message]);

  return (
    <form action={formAction} className="flex flex-col mt-2">
      <textarea
        name="description"
        className="w-full text-2xl h-40 p-4 border border-gray-300 rounded-lg border-2 border-black"
        defaultValue={description}
      />
      <input
        type="text"
        name="projectId"
        defaultValue={projectId}
        className="hidden"
      />
      <button
        disabled={pending}
        className={twMerge(
          'mt-4 w-full p-4 text-white rounded-lg',
          pending ? 'bg-gray-300' : 'bg-blue-500'
        )}
        type="submit"
      >
        Update
      </button>
    </form>
  );
};
