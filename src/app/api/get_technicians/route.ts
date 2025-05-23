'use server';
import { NextResponse } from 'next/server';
import { getEmployees } from '~/server/functions';
import { auth } from '~/auth';

export const GET = async (request: Request) => {
  try {
    const session = await auth();
    if (!session) {
      const url = new URL(request.url);
      const apiKey = url.searchParams.get('apikey');
      if (apiKey !== process.env.API_KEY)
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      else {
        const employees = await getEmployees();
        return NextResponse.json(employees, { status: 200 });
      }
    } else {
      const employees = await getEmployees();
      return NextResponse.json(employees, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
};
