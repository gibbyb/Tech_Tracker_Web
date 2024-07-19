"use server";
import type { NextApiRequest, NextApiResponse } from 'next';
import { updateEmployeeStatus } from '~/server/functions';

type UpdateStatusBody = {
  employeeIds: number[];
  newStatus: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { employeeIds, newStatus } = req.body as UpdateStatusBody;

    if (!Array.isArray(employeeIds) || typeof newStatus !== 'string') {
      return res.status(400).json({ message: 'Invalid input' });
    }

    try {
      await updateEmployeeStatus(employeeIds, newStatus);
      return res.status(200).json({ message: 'Status updated successfully' });
    } catch (error) {
      console.error('Error updating status:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
