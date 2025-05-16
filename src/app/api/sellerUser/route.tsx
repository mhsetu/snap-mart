import { connectDB } from '@/utils/ConnectToDB';
import { NextRequest, NextResponse } from 'next/server';

const db = await connectDB();
const userCollection = db!.collection('test_user');

//   export async function GET(req: NextRequest) {
//     const data = await req.json();
//     console.log(data);
//     const user = await phonesCollection.insertOne(data);
//     return NextResponse.json(user);
//   }

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const email = params.id;
    const query = { email };
    console.log('query', query);
    const user = await userCollection.findOne(query);
    console.log('newUser', user);

    return NextResponse.json({ isSale: user?.role === 'Seller' });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
    //   return NextResponse.json(user);
  }
}

//   app.get('/users/sales/:id', async (req, res) => {
//       const email = req.params.id;
//       const query = { email };
//       console.log('query', query);
//       const user = await UsersCollection.findOne(query);
//       console.log('newUser', user);
//       res.send({ isSale: user?.person === 'Seller' });
//     });






