import { getSdk } from './generated/generated';
import { GraphQLClient } from 'graphql-request';

const apiUrl = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/graphql`
  : 'http://localhost:4000/graphql';

export const gqlOperations = getSdk(
  new GraphQLClient(apiUrl, {
    fetch: (input, init) => {
      console.log(apiUrl);

      return fetch(input, init);
    },
  })
);
