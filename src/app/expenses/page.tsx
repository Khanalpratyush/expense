'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Friend {
  _id: string;
  name: string;
}

interface Split {
  friend: Friend;
  amount: number;
}

interface Expense {
  _id: string;
  description: string;
  amount: number;
  paidBy: Friend;
  date: string;
  splits: Split[];
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('/api/expenses');
        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
        setError('Failed to load expenses');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <Link
          href="/expenses/new"
          className="bg-foreground text-background px-4 py-2 rounded-md hover:bg-foreground/90 transition-colors"
        >
          Add Expense
        </Link>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : expenses.length === 0 ? (
        <div className="bg-foreground/5 rounded-lg p-6">
          <p className="text-center text-foreground/60">
            No expenses yet. Add your first expense to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {expenses.map((expense) => (
            <div
              key={expense._id}
              className="bg-foreground/5 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">{expense.description}</h3>
                  <p className="text-sm text-foreground/60">
                    Paid by {expense.paidBy?.name || 'Unknown'}
                  </p>
                </div>
                <p className="font-medium">${expense.amount}</p>
              </div>
              <div className="border-t border-foreground/10 pt-3">
                <p className="text-sm font-medium mb-2">Split between:</p>
                <div className="grid gap-2">
                  {expense.splits.map((split, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{split.friend?.name || 'Unknown'}</span>
                      <span>${split.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 