'use client';

import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const SignInView = () => {
  const { status } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      push('/');
    }
  }, [status]);

  const [email, setEmail] = useState('pavel1@email.cz');
  const [password, setPassword] = useState('heslo');

  const handleSubmit = async () => {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
          Sign in to your account
        </h2>
        <form
          className="space-y-6"
          onSubmit={(ev) => {
            ev.preventDefault();
            handleSubmit();
          }}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 
                 rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
                 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 
                 rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
                 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">Dont have an account?</div>
            <div className="text-sm">
              <Link href={'/sign-up'}>Sign up</Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent 
                 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 
                 hover:bg-indigo-700 focus:outline-none focus:ring-2 
                 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
