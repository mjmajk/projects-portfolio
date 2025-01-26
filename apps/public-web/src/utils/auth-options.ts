import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { gqlOperations } from '../gql-client';

export type Credentials = {
  email: string;
  password: string;
};

const customProvider = CredentialsProvider({
  name: 'Custom Provider',
  type: 'credentials',
  credentials: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
  },

  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
      throw new Error('Invalid credentials');
    }

    const { data, errors } = await gqlOperations.SignIn({
      email: credentials.email,
      password: credentials.password,
    });

    if (errors || !data.signIn.token) {
      throw new Error('Invalid credentials');
    }

    return {
      id: `${data.signIn.user.id}`,
      email: credentials.email,
      token: data.signIn.token,
    };
  },
});

export const authOptions: AuthOptions = {
  session: { strategy: 'jwt' },
  providers: [customProvider],
  callbacks: {
    // Attach JWT from GraphQL to the NextAuth token
    async jwt({ token, user }: any) {
      if (user?.token) {
        token.accessToken = user.token;
      }

      return token;
    },
    // Expose it in the session
    async session({ session, token }: any) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken as string;
      }

      return session;
    },
  },
};
