import type { NextApiRequest, NextApiResponse } from 'next';
const crypto = require('crypto');

interface Data {
  data?: string;
  message?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin') {
    const generatedToken = crypto.randomBytes(10).toString('hex');
    return res.status(200).json({ data: generatedToken });
  }

  return res.status(401).json({ message: 'User does not exist' });
}
