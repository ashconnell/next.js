import { MongoClient } from 'mongodb'

let uri = process.env.MONGODB_URI
let dbName = process.env.MONGODB_DB

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}

// global is used here to ensure the connection is cached across
// hot-reloads during development.
let cached = global.mongo
if (!cached) cached = global.mongo = {}

export async function connectToDatabase() {
  if (cached.connection) {
    console.log('using cached')
    return cached.connection
  }
  if (!cached.promise) {
    cached.promise = new Promise(async (resolve) => {
      console.log('creating connection')
      const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log('client created')
      const db = await client.db(dbName)
      console.log('db created')
      cached.connection = { client, db }
      resolve()
    })
  }
  await cached.promise
  return cached.connection
}
