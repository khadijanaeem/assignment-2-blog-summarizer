import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI!);
const db = client.db('blog_db');
const collection = db.collection('blogs');

export async function saveToMongo(fullText: string) {
  try {
    await client.connect(); // Ensure connection is successful first
    return await collection.insertOne({
      fullText,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('❌ MongoDB insert error:', error);
    throw error;
  } finally {
  try {
    await client.close();
  } catch (closeError) {
    if (closeError instanceof Error) {
      console.warn('⚠️ Error closing MongoDB connection:', closeError.message);
    } else {
      console.warn('⚠️ Unknown error closing MongoDB connection:', closeError);
    }
  }
}

}
