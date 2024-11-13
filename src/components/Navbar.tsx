import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-foreground/5 backdrop-blur-lg border-b border-foreground/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl">
            SplitWise
          </Link>
          <div className="flex gap-4">
            <Link 
              href="/expenses" 
              className="hover:text-foreground/80 transition-colors"
            >
              Expenses
            </Link>
            <Link 
              href="/groups" 
              className="hover:text-foreground/80 transition-colors"
            >
              Groups
            </Link>
            <Link 
              href="/friends" 
              className="hover:text-foreground/80 transition-colors"
            >
              Friends
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 