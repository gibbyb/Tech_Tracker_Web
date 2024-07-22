"use server";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateEmployeeStatus } from '~/server/functions';
import { auth } from '~/auth';

type UpdateStatusBody = {
  employeeIds: string[];
  newStatus: string;
};

export const POST = async (req: NextRequest) => {
  const session = await auth();
  if (!session) 
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  const { employeeIds, newStatus } = await req.json() as UpdateStatusBody;
  if (!Array.isArray(employeeIds) || typeof newStatus !== 'string')
    return NextResponse.json(
      { message: 'Invalid input' },
      { status: 400 }
    );
  try {
    await updateEmployeeStatus(employeeIds, newStatus);
    return NextResponse.json(
      { message: 'Status updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating status:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
