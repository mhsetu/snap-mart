import { connectDB } from '@/utils/ConnectToDB';
import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from './auth';

const db = await connectDB();
const bookingCollection = db!.collection('category');
const userCollection = db!.collection('users');

// export async function POST(req: NextRequest) {
//   //   console.log(req.json());

//   const booking = req.json();
//   const result = await bookingCollection.insertOne(booking);

//   return NextResponse.json(result);
// }
interface SubmitTypes {
  email: string;
  name: string;
  password: string; // hashed password should also be a string
  phone: string;
  userType: string;
}

export async function GET() {
  //   console.log(req.json());

  const result = await bookingCollection.find({}).toArray();
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  //   console.log(req.json());

  const data: SubmitTypes = await req.json();
  // console.log(userDetails);
  const { email, name, password, phone, userType } = data;
  const hashedPassword = await hashPassword(password);

  const userDetails: SubmitTypes = {
    email,
    name,
    password: hashedPassword,
    phone,
    userType,
  };

  const existingUser = await userCollection.findOne({
    email: email,
  });

  if (existingUser) {
    return NextResponse.json(
      { success: false, message: 'User already exists' },
      { status: 400 }
    );
  }

  const result = await userCollection.insertOne(userDetails);
  console.log(result);
  return NextResponse.json(result);
  // return NextResponse;
}
