"use server";
import { NextResponse } from 'next/server';
import { getEmployees } from '~/server/functions';
import { auth } from '~/auth';

export const GET = async () => {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const employees = await getEmployees();
    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
