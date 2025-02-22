'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { SignOutButton } from './SignOutButton';

export const Navbar = () => {
  const { status } = useSession();

  if (status !== 'authenticated') {
    return null;
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link className="text-blue-500" href="/">
                Projects
              </Link>
            </li>
            <li>
              <SignOutButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
