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

  fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
          mutation UpdateDescription($description: String!, $id: Int!) {
            updateDescription(description: $description, id: $id) {
                id
                description
            }
          }
        `,
      variables: { description, id: projectId },
    }),
  });

  revalidatePath(`/projects-server-component`);
}
