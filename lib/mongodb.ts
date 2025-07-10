import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI!);
const db = client.db('blog_db');
const collection = db.collection('blogs');

export async function saveToMongo(fullText: string) {
  await client.connect();
  return collection.insertOne({ fullText, createdAt: new Date() });
}
