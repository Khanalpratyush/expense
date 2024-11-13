import { connectDB } from '@/lib/db';
import { Friend } from '@/models/Friend';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const friends = await Friend.find({}).sort({ createdAt: -1 });
    return NextResponse.json(friends);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch friends' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const friend = await Friend.create(data);
    return NextResponse.json(friend);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create friend' }, { status: 500 });
  }
} 