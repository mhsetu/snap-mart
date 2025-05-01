
import { authOptions } from '@/utils/authOptions';
import NextAuth, { NextAuthOptions } from 'next-auth';

type Info = {
  username: string;
  password: string;
};



const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
