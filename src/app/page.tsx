import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Split Expenses with Ease</h1>
        <p className="text-foreground/60 max-w-md mx-auto">
          Track shared expenses, split bills, and settle up with friends and family.
        </p>
      </div>
      
      <div className="flex gap-4">
        <Link
          href="/expenses/new"
          className="rounded-full bg-foreground text-background px-6 py-3 hover:bg-foreground/90 transition-colors"
        >
          Add Expense
        </Link>
        <Link
          href="/friends/new"
          className="rounded-full border border-foreground/10 px-6 py-3 hover:bg-foreground/5 transition-colors"
        >
          Add Friends
        </Link>
      </div>
    </div>
  );
}
