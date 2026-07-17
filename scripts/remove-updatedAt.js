const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.DATABASE_URL;

async function removeUpdatedAt() {
  if (!uri) {
    console.error('❌ DATABASE_URL not found in .env file');
    return;
  }
  
  console.log('🔍 Connecting to MongoDB...');
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000,
  });
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB!');
    
    const db = client.db();
    
    // Check all collections
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    console.log('📊 Collections found:', collectionNames.join(', '));
    
    // Try both cases
    let collectionName = null;
    if (collectionNames.includes('Event')) {
      collectionName = 'Event';
      console.log('📌 Found "Event" collection');
    } else if (collectionNames.includes('events')) {
      collectionName = 'events';
      console.log('📌 Found "events" collection');
    } else {
      console.log('❌ No Event/events collection found!');
      return;
    }
    
    // Check if the field exists
    const sample = await db.collection(collectionName).findOne({});
    console.log('📌 Sample document fields:', sample ? Object.keys(sample).join(', ') : 'No documents found');
    
    if (!sample) {
      console.log('ℹ️ No documents found in the collection.');
      return;
    }
    
    if ('updatedAt' in sample) {
      console.log('🔧 Removing updatedAt from all documents...');
      const result = await db.collection(collectionName).updateMany(
        {},
        { $unset: { updatedAt: '' } }
      );
      console.log(`✅ Removed updatedAt from ${result.modifiedCount} documents`);
    } else {
      console.log('✅ updatedAt field already removed!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
  } finally {
    await client.close();
    console.log('👋 Disconnected from MongoDB');
  }
}

removeUpdatedAt();