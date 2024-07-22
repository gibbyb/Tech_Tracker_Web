"use server";
import { NextResponse } from 'next/server';
import { updateEmployeeStatusByName } from '~/server/functions';

interface Technician {
  name: string;
  status: string;
}

// Type guard to check if an object is a Technician
const isTechnician = (technician: unknown): technician is Technician => {
  if (typeof technician !== 'object' || technician === null) return false;
  return 'name' in technician &&
    typeof (technician as Technician).name === 'string' &&
    'status' in technician &&
    typeof (technician as Technician).status === 'string';
};

export const POST = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const apiKey = url.searchParams.get('apikey');
    if (apiKey !== process.env.API_KEY)
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const body: unknown = await request.json();
    // Validate the body and its technicians property
    if (typeof body !== 'object' || body === null ||
        !Array.isArray((body as { technicians?: unknown[] }).technicians))
      return NextResponse.json(
        { message: 'Invalid input: expecting an array of technicians.' },
        { status: 400 }
      );
    const technicians = (body as { technicians: unknown[] }).technicians;
    if (!technicians.every(isTechnician))
      return NextResponse.json(
        { message: 'Invalid input: missing name or status for a technician.' },
          { status: 400 }
      );
    await updateEmployeeStatusByName(technicians);
    return NextResponse.json(
      { message: 'Technicians updated successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating technicians:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
