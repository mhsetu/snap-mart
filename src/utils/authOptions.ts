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

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials): Promise<any> {
        console.log(credentials, 'CREDENTIALS AUTH');
        if (!credentials) return null;

        const user = await loginUser(credentials);

        // const { username, password } = credentials;
        // const db = await connectDB();

        // const user = await db?.collection('test_user').findOne({ username });

        // const isPasswordOk = password == user!.password;

        // const user = { id: '1', username: 'Smith', email: 'smith@gmail.com' };
        // if (isPasswordOk) {
        //   return user;
        // } else {
        //   return null;
        // }
        if (user) {
          return user;
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
        token.username = user.name;
        // token.role = (user as any).role || (user as any).userType;
        token.userType = (user as any).userType;
        console.log(token.userType, token.username, 'this is me');
      }
      console.log(token, 'this is token');
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'default_secret',
};
