import { prisma } from '../../lib/prismaClient';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const userResolvers = {
  //   Query: {
  //     // e.g. get your own user profile (optionally)
  //   },
  Mutation: {
    // 1) Sign up
    signUp: async (
      _: any,
      {
        email,
        password,
        name,
      }: { email: string; password: string; name?: string }
    ) => {
      // Check if user already exists
      const existing = await prisma.user.findUnique({
        where: { email },
      });
      if (existing) {
        throw new Error('A user with this email already exists.');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      // Sign JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '1d',
      });

      return {
        user,
        token,
      };
    },

    // 2) Sign in
    signIn: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new Error('No user found with that email.');
      }

      // Compare password
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid password.');
      }

      // Sign JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '1d',
      });

      return {
        user,
        token,
      };
    },
  },
};
