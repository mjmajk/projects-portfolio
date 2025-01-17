'use client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React, { PropsWithChildren } from 'react';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  cache: new InMemoryCache(),
});

export const Providers = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
