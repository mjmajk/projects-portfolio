import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { createServer } from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { PrismaClient, Image, Project } from '@prisma/client';

// Enable Prisma logging for queries, errors, etc.
const prismaClient = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Read the schema from a .graphql file
const typeDefs = fs.readFileSync(
  path.resolve(process.cwd(), 'schema.graphql'),
  'utf8'
);

const resolvers = {
  Query: {
    projects: async () => {
      // This will be visible in Docker logs
      console.log('Fetching all projects...');
      const projects = await prismaClient.project.findMany({
        include: { image: true },
      });
      console.log('Fetched projects:', projects);
      return projects;
    },
    project: async (_: any, { id }: { id: number }) => {
      console.log(`Fetching project with id: ${id}`);
      const project = await prismaClient.project.findUnique({
        where: { id },
        include: { image: true },
      });
      return project;
    },
  },
  Mutation: {
    deleteAll: async () => {
      console.log('Deleting all Projects and Images...');
      await prismaClient.project.deleteMany();
      await prismaClient.image.deleteMany();
      console.log('Deleted all records.');
      return true;
    },
    updateDescription: async (
      _: any,
      { id, description }: { id: number; description: string }
    ) => {
      console.log(`Updating description for project with id ${id}`);
      const project = await prismaClient.project.update({
        where: { id },
        data: { description },
      });
      return project;
    },
    seedProjects: async () => {
      console.log('Seeding example Project and Image data...');
      const exampleImage: Image = {
        id: 1,
        url: '/images/example-900-600.png',
        height: 600,
        width: 900,
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

      await prismaClient.project.createMany({
        data: projectData,
        skipDuplicates: true,
      });
      console.log('Seed complete.');
      return true;
    },
  },
};

async function startServer() {
  // Create an Express app
  const app = express();

  if (!process.env.PUBLIC_FOLDER) {
    throw new Error('PUBLIC_FOLDER environment variable is not set');
  }
  // Serve static files from the "public" directory (create one if you haven't yet)
  app.use(express.static(process.env.PUBLIC_FOLDER));

  // Create an instance of Apollo Server
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start the Apollo Server
  await apolloServer.start();

  // Attach the Apollo Server middleware to Express on the "/graphql" endpoint
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(apolloServer)
  );

  app.use(cors());

  // Create and start the HTTP server
  const httpServer = createServer(app);
  const PORT = 4000;

  httpServer.listen(PORT, () => {
    // This log will also appear in your Docker logs
    console.log(`Server is running at http://localhost:${PORT}/graphql`);
  });
}

startServer()
  .then(() => {
    console.log('Server started successfully');
  })
  .catch((err) => {
    console.error('Error starting the server:', err);
  });
