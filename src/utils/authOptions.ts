import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import loginUser from '@/app/actions/loginUser';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      userType?: string; // your custom token property
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    name?: string;
    email?: string;
    userType?: string; // your custom token property
  }
}

type ExtendedUser = {
  id: string;
  name: string;
  email: string;
  userType: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(
        credentials: Record<'email' | 'password', string> | undefined
      ): Promise<ExtendedUser | null> {
        console.log(credentials, 'CREDENTIALS AUTH');
        if (!credentials) return null;

        const user = await loginUser(credentials);

        // if (!user) {
        //   return null;
        // } else {
        //   return null;
        // }
        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            userType: user.userType,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user!.name = token.name;
        session.user.userType = token.userType;
        console.log(
          session.user!.name,
          session.user.userType,
          'this is another me'
        );
        // session.user!.role = token.role;
      }
      console.log(session, 'this is session');
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // token.username = user.name;
        const extendedUser = user as ExtendedUser;
        token.name = extendedUser.name;
        token.userType = extendedUser.userType;
        token.email = extendedUser.email;
        token.id = extendedUser.id;
        // token.userType = (user as any).userType;
        console.log(token.userType, token.username, 'this is me');
      }
      console.log(token, 'this is token');
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'default_secret',
};
