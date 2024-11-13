'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewFriendPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/friends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/friends');
        router.refresh();
      } else {
        throw new Error('Failed to create friend');
      }
    } catch (error) {
      console.error('Error creating friend:', error);
      alert('Failed to create friend. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Friend</h1>
      <div className="bg-foreground/5 rounded-lg p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              className="w-full p-2 rounded-md border border-foreground/10 bg-background"
              placeholder="Enter friend's name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded-md border border-foreground/10 bg-background"
              placeholder="Enter friend's email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-foreground text-background rounded-md py-2 hover:bg-foreground/90 transition-colors"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Friend'}
          </button>
        </form>
      </div>
    </div>
  );
} 