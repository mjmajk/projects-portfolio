import { signOut } from 'next-auth/react';

export const SignOutButton = () => {
  return <button onClick={() => signOut()}>Log out</button>;
};
