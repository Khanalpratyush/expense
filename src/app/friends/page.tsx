'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Friend {
  _id: string;
  name: string;
  email: string;
}

export default function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch('/api/friends');
        const data = await response.json();
        setFriends(data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Friends</h1>
        <Link
          href="/friends/new"
          className="bg-foreground text-background px-4 py-2 rounded-md hover:bg-foreground/90 transition-colors"
        >
          Add Friend
        </Link>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : friends.length === 0 ? (
        <div className="bg-foreground/5 rounded-lg p-6">
          <p className="text-center text-foreground/60">
            No friends added yet. Add friends to start splitting expenses.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {friends.map((friend) => (
            <div
              key={friend._id}
              className="bg-foreground/5 rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">{friend.name}</h3>
                <p className="text-sm text-foreground/60">{friend.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 