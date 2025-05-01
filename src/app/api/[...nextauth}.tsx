import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/utils/ConnectToDB';
// import { verifyPassword } from './auth';
import bcrypt from 'bcryptjs';

// import { MongoClient, Db } from 'mongodb';

interface User {
  _id: string;
  email: string;
  password: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        // console.log(credentials);
        // if (!credentials || !credentials.email || !credentials.password) {
        //   throw new Error('Email and password required');
        // }

        // const client: MongoClient | null = await connectDB();
        // const db: Db = client!.db(); // Add database name if needed

        // const user = await User.findOne({ email: credentials.email });
        // if (!user) throw new Error('No user found');

        // const isValid = await bcrypt.compare(credentials.password, user.password);
        // if (!isValid) throw new Error('Invalid password');

        const client = await connectDB();
        
        const userCollection = client?.collection<User>('users');
        // const userCollection = db.collection<User>('users');

        const user = await userCollection?.findOne({
          email: req?.body?.email,
        });
        console.log(user);

        // if (!user) {
        //   throw new Error('No user found with that email');
        // }
        // if (!user || !credentials?.password) return null;
        if (!user) throw new Error('No user found');

        // const isValid = await verifyPassword(
        //   credentials.password,
        //   user.password
        // );
        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isValid) throw new Error('Invalid password');

        return { id: user._id, email: user.email };
      },
    }),
  ],
  // session: {
  //   strategy: 'jwt',
  // },
  pages: {
    signIn: '/api/login', // Optional custom sign-in page
  },
  // secret: process.env.NEXTAUTH_SECRET, // Required for JWT session encryption
});
export { handler as POST, handler as GET };
