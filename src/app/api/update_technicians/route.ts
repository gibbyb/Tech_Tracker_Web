// src/app/api/update_technicians/route.ts

"use server";
import { NextResponse } from 'next/server';
import { legacyUpdateEmployeeStatusByName } from '~/server/functions';

interface Technician {
  name: string;
  status: string;
}

// Type guard to check if an object is a Technician
const isTechnician = (technician: any): technician is Technician => {
  return typeof technician.name === 'string' && typeof technician.status === 'string';
};

export const POST = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const apiKey = url.searchParams.get('apikey');

    if (apiKey !== 'zAf4vYVN2pszrK') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { technicians } = await request.json() as { technicians: Technician[] };
    if (!Array.isArray(technicians) || technicians.length === 0) {
      return NextResponse.json({ message: 'Invalid input: expecting an array of technicians.' }, { status: 400 });
    }

    for (const technician of technicians) {
      if (!isTechnician(technician)) {
        return NextResponse.json({ message: 'Invalid input: missing name or status for a technician.' }, { status: 400 });
      }
    }

    await legacyUpdateEmployeeStatusByName(technicians);

    return NextResponse.json({ message: 'Technicians updated successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error updating technicians:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
