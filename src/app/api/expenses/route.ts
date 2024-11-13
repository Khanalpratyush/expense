import { connectDB } from '@/lib/db';
import { Expense } from '@/models/Expense';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const expenses = await Expense.find({})
      .populate('paidBy')
      .populate('splits.friend')
      .sort({ date: -1 });
    return NextResponse.json(expenses);
  } catch (error) {
    console.error('Error in GET /api/expenses:', error);
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Create the expense with populated fields
    const expense = await Expense.create(data);
    const populatedExpense = await Expense.findById(expense._id)
      .populate('paidBy')
      .populate('splits.friend');
      
    return NextResponse.json(populatedExpense);
  } catch (error) {
    console.error('Error in POST /api/expenses:', error);
    return NextResponse.json({ error: 'Failed to create expense' }, { status: 500 });
  }
} 