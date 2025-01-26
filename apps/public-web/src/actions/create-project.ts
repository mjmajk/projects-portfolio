'use server';

import { gqlOperations } from '../gql-client';
import { auth } from '../utils/auth';

export type CreateProjectState = {
  message: string;
  projectId?: number;
  type: 'error' | 'success';
};

export async function createProjectHandler(
  prevState: CreateProjectState,
  formData: FormData
): Promise<CreateProjectState> {
  const description = formData.get('description') as string;
  const name = formData.get('name') as string;

  const session = await auth();

  if (!description || !name) {
    return { message: 'Fields are missing', type: 'error' };
  }

  try {
    const createdProject = await gqlOperations(
      session.accessToken
    ).CreateProject({
      description,
      name,
    });

    return {
      type: 'success',
      projectId: createdProject.data.createProject.id,
      message: 'Project created',
    };
  } catch (e) {
    return { message: 'Error while creating project', type: 'error' };
  }
}
