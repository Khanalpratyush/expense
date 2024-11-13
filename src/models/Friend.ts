import mongoose from 'mongoose';

const FriendSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export const Friend = mongoose.models.Friend || mongoose.model('Friend', FriendSchema); 