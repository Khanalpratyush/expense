import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  paidBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Friend', 
    required: true 
  },
  date: { type: Date, default: Date.now },
  splits: [{
    friend: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Friend',
      required: true
    },
    amount: { 
      type: Number, 
      required: true 
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export const Expense = mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema); 