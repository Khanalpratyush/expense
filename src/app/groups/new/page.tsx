export default function NewGroupPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Group</h1>
      <div className="bg-foreground/5 rounded-lg p-6">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Group Name</label>
            <input
              type="text"
              className="w-full p-2 rounded-md border border-foreground/10 bg-background"
              placeholder="Enter group name"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-foreground text-background rounded-md py-2 hover:bg-foreground/90 transition-colors"
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
} 