import { connectDB } from '@/utils/ConnectToDB';
import { NextResponse } from 'next/server';

const db = await connectDB();
const categoryCollection = db!.collection('category');
// const userCollection = db!.collection('users');

export async function GET() {
  //   console.log(req.json());

  const result = await categoryCollection.find({}).toArray();
  return NextResponse.json(result);
}
