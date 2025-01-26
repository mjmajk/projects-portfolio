import { authOptions } from './auth-options';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { getServerSession, Session } from 'next-auth';

type AuthReturn = Session & { accessToken: string };

export function auth( // <-- use this function to access the jwt from React components
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
): AuthReturn {
  return getServerSession(...args, authOptions) as unknown as AuthReturn;
}
