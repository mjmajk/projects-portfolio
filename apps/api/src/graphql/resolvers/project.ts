import { prisma } from '../../lib/prismaClient';
import { getUserIdFromRequest } from '../../middleware/auth';

export const projectResolvers = {
  Query: {
    async projects(_: any, __: any, ctx) {
      const { req } = ctx;

      const userId = getUserIdFromRequest(req);
      if (!userId) {
        throw new Error('Not authenticated.');
      }

      return prisma.project.findMany({
        where: { userId },
        include: { user: true, image: true },
      });
    },
    async project(_: any, { id }: { id: number }, ctx) {
      const { req } = ctx;

      const userId = getUserIdFromRequest(req);

      if (!userId) {
        throw new Error('Not authenticated.');
      }

      return prisma.project.findUnique({
        where: { id, userId },
        include: { user: true, image: true },
      });
    },
  },
  Mutation: {
    // 3) Create Project (must be authenticated)
    createProject: async (
      _: any,
      {
        name,
        description,
        imageUrl,
        imageHeight,
        imageWidth,
      }: {
        name: string;
        description: string;
        imageUrl?: string;
        imageHeight?: number;
        imageWidth?: number;
      },
      context: any
    ) => {
      const { req } = context;
      const userId = getUserIdFromRequest(req);
      if (!userId) {
        throw new Error('Not authenticated.');
      }

      // If image data is provided, create the

      let imageId: number | null = undefined;
      if (imageUrl || imageHeight || imageWidth) {
        const image = await prisma.image.create({
          data: {
            url: imageUrl || '',
            height: imageHeight || 0,
            width: imageWidth || 0,
          },
        });
        imageId = image.id;
      }

      // Create the project
      const project = await prisma.project.create({
        data: {
          name,
          description,
          userId,
          imageId,
        },
        include: {
          user: true,
        },
      });

      return project;
    },
    // 4) Update Project (must be owner)
    updateProject: async (
      _: any,
      {
        id,
        name,
        description,
      }: { id: number; name?: string; description?: string },
      context: any
    ) => {
      const { req } = context;
      const userId = getUserIdFromRequest(req);
      if (!userId) {
        throw new Error('Not authenticated.');
      }

      // Check ownership
      const existing = await prisma.project.findUnique({ where: { id } });
      if (!existing) {
        throw new Error('Project not found.');
      }
      if (existing.userId !== userId) {
        throw new Error('Not authorized to update this project.');
      }

      // Update
      const updated = await prisma.project.update({
        where: { id },
        data: {
          name: name ?? existing.name,
          description: description ?? existing.description,
        },
        include: {
          user: true,
          image: true,
        },
      });

      return updated;
    },

    // 5) Delete Project (must be owner)
    deleteProject: async (_: any, { id }: { id: number }, context: any) => {
      const { req } = context;
      const userId = getUserIdFromRequest(req);
      if (!userId) {
        throw new Error('Not authenticated.');
      }

      // Check ownership
      const existing = await prisma.project.findUnique({ where: { id } });
      if (!existing) {
        throw new Error('Project not found.');
      }
      if (existing.userId !== userId) {
        throw new Error('Not authorized to delete this project.');
      }

      // Delete
      await prisma.project.delete({ where: { id } });

      return true;
    },
  },
};
