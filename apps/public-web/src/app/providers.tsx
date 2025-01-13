'use client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
import { PropsWithChildren } from 'react';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

export const Providers = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
