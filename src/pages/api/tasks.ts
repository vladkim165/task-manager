import type { NextApiRequest, NextApiResponse } from 'next';
import { tasks } from '@/mock/mockData';
import { ITask } from '@/models/ITask';

interface Data {
  data?: ITask[];
  message?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'GET') {
    return res.status(405).send({ message: 'Only GET requests allowed' });
  }

  return res.status(200).json({ data: tasks });
}
