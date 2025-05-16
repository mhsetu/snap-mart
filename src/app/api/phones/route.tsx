import { connectDB } from '@/utils/ConnectToDB';
import { NextRequest, NextResponse } from 'next/server';

const db = await connectDB();
const phonesCollection = db!.collection('phones');

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);
  const result = await phonesCollection.insertOne(data);
  return NextResponse.json(result);
}

export async function GET() {
  const result = await phonesCollection.find({}).toArray();
  return NextResponse.json(result);
}
