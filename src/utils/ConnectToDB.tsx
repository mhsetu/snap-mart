import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://SnapMart:9r9twugBJayF7qZS@cluster0.86bsg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; // Replace with your actual MongoDB URI

const client = new MongoClient(uri);

// type ErrorProps = {
//   message: string;
// };

export async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully!');

    const db = client.db('SnapMart');
    // Replace with your database name
    return db;
  } catch (err: unknown) {
    console.error(err);
  }
}
