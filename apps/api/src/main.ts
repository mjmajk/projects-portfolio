import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Image, PrismaClient, Project } from '@prisma/client';
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
      const projects = await prismaClient.project.findMany({
        include: { image: true },
      });

      return projects;
    },
  },
  Mutation: {
    deleteAll: async () => {
      await prismaClient.project.deleteMany();
      await prismaClient.image.deleteMany();
      return true;
    },
    seedProjects: async () => {
      // Example data you want to seed

      const exampleImage: Image = {
        id: 1,
        url: 'https://example.com/image.jpg',
        height: 100,
        width: 100,
      };

      const image = await prismaClient.image.create({ data: exampleImage });

      const projectData: Project[] = [
        {
          name: 'Project Alpha',
          id: 1,
          description: 'test',
          imageId: image.id,
        },
        {
          name: 'Project Beta',
          id: 2,
          description: 'test',
          imageId: image.id,
        },
        {
          name: 'Project Gamma',
          id: 3,
          description: 'test',
          imageId: image.id,
        },
      ];

      // In case you don’t want to create duplicates every time, you can either:
      // 1. Use createMany with `skipDuplicates: true`
      // 2. Check if these projects exist first, etc.

      await prismaClient.project.createMany({
        data: projectData,
        skipDuplicates: true, // skip if a record with the same unique field already exists
      });

      return true;
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
