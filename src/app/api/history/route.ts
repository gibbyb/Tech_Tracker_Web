"use server";
import { NextResponse } from 'next/server';
import { legacyGetHistory } from '~/server/functions';

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const apiKey = url.searchParams.get('apikey');
    const page = Number(url.searchParams.get('page')) || 1;

    if (apiKey !== 'zAf4vYVN2pszrK') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const perPage = 50; // You can adjust the perPage value as needed
    const historyData = await legacyGetHistory(page, perPage);

    return NextResponse.json(historyData, { status: 200 });
  } catch (error) {
    console.error('Error fetching history data:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
