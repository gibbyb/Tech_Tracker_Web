"use server";
import { NextResponse } from 'next/server';
import { getHistory } from '~/server/functions';
import { auth } from '~/auth';

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const apiKey = url.searchParams.get('apikey');
    const page = Number(url.searchParams.get('page')) || 1;
    if (apiKey !== process.env.API_KEY) {
      const session = await auth();
      if (!session)
        return NextResponse.json(
          { message: 'Unauthorized' },
          { status: 401 }
        );
    }
    const perPage = 50;
    const historyData = await getHistory(page, perPage);
    return NextResponse.json(historyData, { status: 200 });
  } catch (error) {
    console.error('Error fetching history data:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
