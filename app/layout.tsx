import { ThemeProvider } from '@/components/theme-provider';
import { Inter, JetBrains_Mono } from 'next/font/google';
import type React from 'react';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata = {
  title: 'BrainF++ - Minimalist Programming',
  description: 'Master the art of BrainF++ programming',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-background font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
