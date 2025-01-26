'use server';

import { gqlOperations } from '../gql-client';

export type HandleProjectUpdateOnServerState = {
  message: string;
  type: 'error' | 'success';
};

export async function handleUserSignUp(
  prevState: HandleProjectUpdateOnServerState,
  formData: FormData
): Promise<HandleProjectUpdateOnServerState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!name || !email || !password) {
    return { message: 'Some properties are missing', type: 'error' };
  }

  await gqlOperations().SignUp({
    email,
    password,
    name,
  });

  return { message: 'You can now sign in', type: 'success' };
}
