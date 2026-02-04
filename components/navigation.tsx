'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navigation = () => {
  const pathname = usePathname();

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
            <Link href="/" className={`font-mono hover:text-cyan-400 ${pathname === '/' ? 'text-cyan-400' : 'text-foreground'}`}>
              Home
            </Link>
            <Link href="/contest" className={`font-mono hover:text-cyan-400 ${pathname === '/contest' ? 'text-cyan-400' : 'text-foreground'}`}>
              Contest
            </Link>
            <Link href="/docs" className={`font-mono hover:text-cyan-400 ${pathname === '/docs' ? 'text-cyan-400' : 'text-foreground'}`}>
              Docs
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
