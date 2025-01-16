'use server';
import { NextResponse } from 'next/server';
import { get_history } from '~/server/functions';
import { auth } from '~/auth';

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const apiKey = url.searchParams.get('apikey');
    const userId = Number(url.searchParams.get('user_id')) || -1;
    const page = Number(url.searchParams.get('page')) || 1;
    const perPage = Number(url.searchParams.get('per_page')) || 50;
    if (apiKey !== process.env.API_KEY) {
      const session = await auth();
      if (!session)
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const historyData = await get_history(userId, page, perPage);
    return NextResponse.json(historyData, { status: 200 });
  } catch (error) {
    console.error('Error fetching history data:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
};
