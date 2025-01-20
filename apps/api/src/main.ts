import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prismaClient = new PrismaClient();

// Read the schema from a .graphql file
const typeDefs = fs.readFileSync(
  path.resolve(process.cwd(), 'schema.graphql'),
  'utf8'
);

const resolvers = {
  Query: {
    // Example "read" query for all projects
    projects: async () => {
      return prismaClient.project.findMany();
    },
  },
  Mutation: {
    // "Seed" mutation
    seedProjects: async () => {
      // Example data you want to seed
      const projectData = [
        { name: 'Project Alpha' },
        { name: 'Project Beta' },
        { name: 'Project Gamma' },
      ];

      // In case you don’t want to create duplicates every time, you can either:
      // 1. Use createMany with `skipDuplicates: true`
      // 2. Check if these projects exist first, etc.

      await prismaClient.project.createMany({
        data: projectData,
        skipDuplicates: true, // skip if a record with the same unique field already exists
      });

      // Return the newly created (or existing) projects
      return prismaClient.project.findMany();
    },
  },
};

// Create and start server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀 Server ready at: ${url}`);
});
