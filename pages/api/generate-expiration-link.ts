import { v4 as uuidv4 } from 'uuid';

// Simulating a token database (this should be replaced with your actual database logic)
export const tokenDatabase: Record<string, { userId: string; expiresAt: Date; used: boolean }> = {};

export default function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Generate a unique token and set expiration (20 seconds from now)
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + 20); // 20-second expiration

    // Store token with expiration (simulated in memory)
    tokenDatabase[token] = {
      userId,
      expiresAt,
      used: false,
    };

    // Generate the expiring link
    const expiringLink = `http://localhost:3000/api/redirect/${token}`;

    return res.status(200).json({ expiringLink });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
