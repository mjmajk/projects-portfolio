'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  CreateProjectState,
  createProjectHandler,
} from '../../actions/create-project';

const initialState: CreateProjectState = {
  message: '',
  type: 'error',
};

export const CreateProjectView = () => {
  const { push } = useRouter();

  const [state, formAction, pending] = useActionState(
    createProjectHandler,
    initialState
  );

  useEffect(() => {
    if (!state.message) return;
    if (state.type === 'success') {
      push(`project-details/${state.projectId}`);
    }
    toast(state.message, { type: state.type });
  }, [state]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 ">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
          Create new project
        </h2>
        <form className="space-y-6" action={formAction}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              id="name"
              name="name"
              type="name"
              autoComplete="name"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 
                 rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
                 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              id="description"
              name="description"
              type="description"
              autoComplete="description"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 
                 rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
                 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              disabled={pending}
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent 
                 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 
                 hover:bg-indigo-700 focus:outline-none focus:ring-2 
                 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
