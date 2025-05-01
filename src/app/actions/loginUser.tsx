import { connectDB } from '@/utils/ConnectToDB';

interface loginPayload {
  email: string;
  password: string;
}

export const loginUser = async (payload: loginPayload) => {
  const { email, password } = payload;

  const db = await connectDB();
//   const result = await db!.collection('test_user').insertOne(payload);

  const user = await db?.collection('test_user').findOne({ email });

  if (!user) return null;
  //   const isPasswordOK = bcrypt.compare(user.password, password);
  const isPasswordOk = password == user!.password;
  if (!isPasswordOk) return null;

  return user;
};

export default loginUser;
