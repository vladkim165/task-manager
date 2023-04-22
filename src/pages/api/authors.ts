import type { NextApiRequest, NextApiResponse } from 'next';
import { authors } from '@/mock/mockData';
import { IAuthor } from '@/models/IAuthor';

interface Data {
  data?: IAuthor[];
  message?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'GET') {
    return res.status(405).send({ message: 'Only GET requests allowed' });
  }

  return res.status(200).json({ data: authors });
}
