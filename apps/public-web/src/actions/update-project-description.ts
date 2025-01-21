'use server';

import { gqlOperations } from '../gql-client';
import { revalidatePath } from 'next/cache';

export type HandleProjectUpdateOnServerState = {
  message: string;
  type: 'error' | 'success';
};

export async function handleProjectUpdateOnServer(
  prevState: HandleProjectUpdateOnServerState,
  formData: FormData
): Promise<HandleProjectUpdateOnServerState> {
  const description = formData.get('description') as string;

  const projectId = parseInt(formData.get('projectId') as string);

  if (!description) {
    return { message: 'Description is required', type: 'error' };
  }

  if (!projectId) {
    throw new Error('Project ID is required.');
  }

  await gqlOperations.UpdateDescription({ description, id: projectId });

  revalidatePath(`/project-detail/${projectId}`);
  revalidatePath(`/projects`);

  return { message: 'Description updated', type: 'success' };
}
