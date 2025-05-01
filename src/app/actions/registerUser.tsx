'use server';

import { connectDB } from '@/utils/ConnectToDB';

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
): Promise<SafeInsertResult | null> => {
  try {
    const db = await connectDB();
    const result = await db!
      .collection<UserPayload>('test_user')
      .insertOne(payload);

    return {
      acknowledged: result.acknowledged,
      insertedId: result.insertedId.toString(), // ✅ convert ObjectId to string
    };
  } catch (error) {
    console.error('Register User Error:', error);
    return null;
  }
};
