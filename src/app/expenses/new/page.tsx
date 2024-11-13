'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Friend {
  _id: string;
  name: string;
}

interface Split {
  friend: string;
  amount: number;
}

export default function NewExpensePage() {
  const router = useRouter();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    paidBy: '',
    splits: [] as Split[],
  });
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch('/api/friends');
        const data = await response.json();
        setFriends(data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, []);

  // Automatically split amount when amount changes or friends are selected/deselected
  useEffect(() => {
    if (formData.amount && selectedFriends.length > 0) {
      handleSplitEqually();
    }
  }, [formData.amount, selectedFriends]);

  const handleSplitEqually = () => {
    const amount = parseFloat(formData.amount);
    if (!amount || selectedFriends.length === 0) return;

    const splitAmount = Number((amount / (selectedFriends.length + 1)).toFixed(2)); // +1 for the payer
    const newSplits = friends.map(friend => ({
      friend: friend._id,
      amount: selectedFriends.includes(friend._id) ? splitAmount : 0
    }));

    setFormData(prev => ({
      ...prev,
      splits: newSplits
    }));
  };

  const toggleFriendSelection = (friendId: string) => {
    setSelectedFriends(prev => {
      if (prev.includes(friendId)) {
        return prev.filter(id => id !== friendId);
      } else {
        return [...prev, friendId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFriends.length === 0) {
      alert('Please select at least one friend to split with');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: formData.description,
          amount: parseFloat(formData.amount),
          paidBy: formData.paidBy,
          splits: formData.splits.filter(split => split.amount > 0), // Only include non-zero splits
        }),
      });

      if (response.ok) {
        router.push('/expenses');
        router.refresh();
      } else {
        throw new Error('Failed to create expense');
      }
    } catch (error) {
      console.error('Error creating expense:', error);
      alert('Failed to create expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Expense</h1>
      <div className="bg-foreground/5 rounded-lg p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <input
              type="text"
              className="w-full p-2 rounded-md border border-foreground/10 bg-background"
              placeholder="Enter expense description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
              className="w-full p-2 rounded-md border border-foreground/10 bg-background"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Paid By</label>
            <select
              className="w-full p-2 rounded-md border border-foreground/10 bg-background"
              value={formData.paidBy}
              onChange={(e) => setFormData({ ...formData, paidBy: e.target.value })}
              required
            >
              <option value="">Select who paid</option>
              {friends.map((friend) => (
                <option key={friend._id} value={friend._id}>
                  {friend.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Split with</label>
            <div className="space-y-2 max-h-48 overflow-y-auto p-2 border border-foreground/10 rounded-md">
              {friends.map((friend) => (
                <label
                  key={friend._id}
                  className="flex items-center gap-2 p-2 hover:bg-foreground/5 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFriends.includes(friend._id)}
                    onChange={() => toggleFriendSelection(friend._id)}
                    className="rounded border-foreground/20"
                  />
                  <span>{friend.name}</span>
                </label>
              ))}
            </div>
          </div>

          {selectedFriends.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Split Preview</h3>
              <div className="space-y-2 bg-foreground/5 p-3 rounded-md">
                {friends.map((friend) => {
                  const split = formData.splits.find(s => s.friend === friend._id);
                  if (!split || split.amount === 0) return null;
                  return (
                    <div key={friend._id} className="flex justify-between text-sm">
                      <span>{friend.name}</span>
                      <span>${split.amount}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-foreground text-background rounded-md py-2 hover:bg-foreground/90 transition-colors"
            disabled={loading || selectedFriends.length === 0}
          >
            {loading ? 'Adding...' : 'Add Expense'}
          </button>
        </form>
      </div>
    </div>
  );
} 