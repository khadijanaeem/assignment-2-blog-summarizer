import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI!);

export async function saveToMongo(fullText: string) {
  try {
    await client.connect();
    const db = client.db('blog_db');
    const collection = db.collection('blogs');

    const result = await collection.insertOne({
      fullText,
      createdAt: new Date()
    });

    console.log('✅ Inserted:', result.insertedId);
    return result;
  } catch (error) {
    console.error('❌ Mongo insert error:', error);
    throw error;
  } finally {
    await client.close(); // Optional: close if not reusing
  }
}
