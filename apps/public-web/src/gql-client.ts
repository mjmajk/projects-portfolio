import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated/generated';

const apiUrl = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/graphql`
  : 'http://localhost:4000/graphql';

export const gqlOperations = (token?: string) => {
  return getSdk(
    new GraphQLClient(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
};
