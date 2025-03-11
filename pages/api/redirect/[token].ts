import { NextApiRequest, NextApiResponse } from 'next';
import { tokenDatabase } from '../generate-expiration-link';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  // Check if the token exists in the database
  if (!tokenDatabase[token as string]) {
    return res.redirect("/not-found")
  }

  const tokenData = tokenDatabase[token as string];
  const currentTime = new Date();

  // Check if the token has expired
  if (currentTime > tokenData.expiresAt) {
    return res.status(400).json({ error: 'This link has expired' });
  }

  // If valid, redirect to the WhatsApp community link
  return res.redirect('https://chat.whatsapp.com/FZfMyOHTuAdHoP06PErcFX');
}

