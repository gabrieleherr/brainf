import Link from 'next/link';

export const Navigation = () => {
  return (
    <header className="border-b border-border">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text font-mono text-3xl font-bold text-transparent"
            >
              BrainF++
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="font-mono text-cyan-400 hover:text-cyan-300">
                Home
              </Link>
              <Link href="/contest" className="font-mono text-foreground hover:text-cyan-400">
                Contest
              </Link>
              <Link href="/docs" className="font-mono text-muted-foreground hover:text-cyan-400">
                Docs
              </Link>
            </nav>
          </div>
        </div>
    </header>
  );
};
