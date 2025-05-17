'use server';

import { connectDB } from '@/utils/ConnectToDB';
import { MongoServerError } from 'mongodb';

interface UserPayload {
  email: string;
  name: string;
  password: string;
  phone: string;
  userType: string;
}

interface SafeInsertResult {
  acknowledged: boolean;
  insertedId: string;
}

export const registerUser = async (
  payload: UserPayload
): Promise<SafeInsertResult | { error: string } | null> => {
  try {
    const db = await connectDB();
    // const duplicate = await db!
    //   .collection('test_user')
    //   .createIndex({ email: 1, name: 1 }, { unique: true });
    const result = await db!
      .collection<UserPayload>('test_user')
      .insertOne(payload);

    return {
      acknowledged: result.acknowledged,
      insertedId: result.insertedId.toString(), // ✅ convert ObjectId to string
    };
  } catch (error: unknown) {
    if (error instanceof MongoServerError && error.code === 11000) {
      return { error: 'User already exists with this email or username.' };
    }

    console.error('Register User Error:', error);
    return null;
  }
};
