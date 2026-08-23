import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Sidebar } from '@/components/Sidebar';
import { getRuleCMSEndpoint, getRuleCMSToken } from '@/lib/rulecms-config';
import { RuleCMSProvider } from './providers';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'RuleCMS widget gallery (Next.js, host Tailwind)',
    template: '%s · RuleCMS gallery',
  },
  description:
    'A Next.js host with Tailwind. Compare hand-written source JSX with RuleCMS widgets that reuse the host stylesheet.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = getRuleCMSToken();
  const endpoint = getRuleCMSEndpoint();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RuleCMSProvider token={token} endpoint={endpoint}>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="min-w-0 flex-1 px-4 pt-16 pb-12 sm:px-6 lg:px-8 lg:pt-8">
              {children}
            </main>
          </div>
        </RuleCMSProvider>
      </body>
    </html>
  );
}
