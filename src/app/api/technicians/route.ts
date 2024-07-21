"use server";
import { NextResponse } from 'next/server';
import { legacyGetEmployees } from '~/server/functions';

type Technician = {
  name: string;
  status: string;
  updatedAt: Date;
};

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const apiKey = url.searchParams.get('apikey');

    if (apiKey !== 'zAf4vYVN2pszrK') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const employees = await legacyGetEmployees();

    const formattedEmployees = employees.map((employee: Technician) => ({
      name: employee.name,
      status: employee.status,
      time: employee.updatedAt
    }));

    return NextResponse.json(formattedEmployees, { status: 200 });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
