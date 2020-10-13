import { connectToDatabase } from '../../util/mongodb'

export default async function handler(req, res) {
  const { db } = await connectToDatabase()
  const stats = await db.stats()
  res.json({ ok: stats.ok })
}
