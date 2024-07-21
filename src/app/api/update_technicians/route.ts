"use server";
import { NextResponse } from 'next/server';
import { legacyUpdateEmployeeStatusByName } from '~/server/functions';

// Define the Technician type directly in the file
interface Technician {
  name: string;
  status: string;
}

// Type guard to check if an object is a Technician
const isTechnician = (technician: unknown): technician is Technician => {
  if (typeof technician !== 'object' || technician === null) return false;
  return 'name' in technician && typeof (technician as Technician).name === 'string' &&
         'status' in technician && typeof (technician as Technician).status === 'string';
};

export const POST = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const apiKey = url.searchParams.get('apikey');

    if (apiKey !== 'zAf4vYVN2pszrK') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    if (!body || !Array.isArray(body.technicians)) {
      return NextResponse.json({ message: 'Invalid input: expecting an array of technicians.' }, { status: 400 });
    }

    const technicians: unknown[] = body.technicians;

    if (!technicians.every(isTechnician)) {
      return NextResponse.json({ message: 'Invalid input: missing name or status for a technician.' }, { status: 400 });
    }

    await legacyUpdateEmployeeStatusByName(technicians as Technician[]);

    return NextResponse.json({ message: 'Technicians updated successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error updating technicians:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
