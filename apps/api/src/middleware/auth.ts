import { Request } from 'express';
import jwt from 'jsonwebtoken';
import express from 'express';
import { prisma } from '../lib/prismaClient';

export interface GraphQLContext {
  userId?: number | null;
  prisma: typeof prisma;
}

export function buildContext({ req }: { req: Request }): GraphQLContext {
  let userId: number | null = null;

  const authHeader = req.headers.authorization; // e.g. "Bearer <token>"
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: number;
      };
      userId = decoded.userId;
    } catch {
      console.log('Invalid token');
    }
  }

  return {
    userId,
    prisma,
  };
}

export function getUserIdFromRequest(req: express.Request): number | null {
  try {
    const authHeader = req.headers.authorization; // e.g. "Bearer <JWT>"
    if (!authHeader) return null;

    const token = authHeader.split(' ')[1];
    if (!token) return null;

    // Verify token with your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
    };
    return decoded.userId;
  } catch (error) {
    // Token invalid or expired
    return null;
  }
}
