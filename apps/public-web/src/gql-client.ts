import { getSdk } from './generated/generated';
import { GraphQLClient } from 'graphql-request';

export const gqlOperations = getSdk(
  new GraphQLClient(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql',
    {
      fetch: (input, init) => {
        console.log(process.env.NEXT_PUBLIC_API_URL);

        return fetch(input, init);
      },
    }
  )
);
