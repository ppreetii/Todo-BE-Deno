import { MongoClient, Database } from 'https://deno.land/x/mongo@v0.29.2/mod.ts';

import {mongodbUrl} from '../config/config.ts';
 
let db: Database;
 
export async function connect() {
  const client = new MongoClient();
  await client.connect(mongodbUrl);
  console.log('Database connection was successful!');
  db = client.database('denoTodos');
}
 
export function getDb() {
  return db;
}