import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { resolvers } from './graphql/resolvers';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config'; // loads .env
import express from 'express';
import fs from 'fs';
import { createServer } from 'http';
import path from 'path';

async function startServer() {
  if (!process.env.JWT_SECRET) {
    throw new Error('Please set a JWT_SECRET in your .env file');
  }

  const app = express();

  // Serve static files if needed
  if (process.env.PUBLIC_FOLDER) {
    app.use(express.static(process.env.PUBLIC_FOLDER));
  }

  const apolloServer = new ApolloServer({
    typeDefs: fs.readFileSync(
      path.resolve(process.cwd(), 'schema.graphql'),
      'utf8'
    ),
    resolvers,
  });

  await apolloServer.start();

  // Attach GraphQL middleware
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ req }),
    })
  );

  const httpServer = createServer(app);
  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`GraphQL server running at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
});
