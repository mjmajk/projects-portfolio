import { userResolvers } from './user';
import { projectResolvers } from './project';

export const resolvers = {
  Query: {
    // ...userResolvers.Query,
    ...projectResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...projectResolvers.Mutation,
  },
};
