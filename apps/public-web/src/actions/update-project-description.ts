'use server';

import { auth } from '../utils/auth';
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
  const session = await auth();

  const projectId = parseInt(formData.get('projectId') as string);

  if (!description) {
    return { message: 'Description is required', type: 'error' };
  }

  if (!projectId) {
    throw new Error('Project ID is required.');
  }

  console.log('Updating project description...', session.accessToken);

  await gqlOperations(session.accessToken).UpdateProject({
    description,
    updateProjectId: projectId,
  });

  revalidatePath(`/project-detail/${projectId}`);
  revalidatePath(`/projects`);

  return { message: 'Description updated', type: 'success' };
}
