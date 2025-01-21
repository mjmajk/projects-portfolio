import { gqlOperations } from '../gql-client';
import { revalidatePath } from 'next/cache';

export async function handleProjectUpdateOnServer(formData: FormData) {
  'use server';

  const description = formData.get('description') as string;

  const projectId = parseInt(formData.get('projectId') as string);

  if (!description) {
    throw new Error('Description is required.');
  }

  if (!projectId) {
    throw new Error('Project ID is required.');
  }

  await gqlOperations.UpdateDescription({ description, id: projectId });

  revalidatePath(`/project-detail/${projectId}`);
  revalidatePath(`/projects`);
}
