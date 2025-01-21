import { getSdk } from './generated/generated';
import { GraphQLClient } from 'graphql-request';

export const gqlOperations = getSdk(
  new GraphQLClient(process.env.NEXT_PUBLIC_API_URL as string)
);
