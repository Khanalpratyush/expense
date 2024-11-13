export interface Friend {
  id: string;
  name: string;
  email: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  date: Date;
  splits: Split[];
}

export interface Split {
  friendId: string;
  amount: number;
}

export interface Group {
  id: string;
  name: string;
  members: string[]; // friend IDs
} 