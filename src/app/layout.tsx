import '~/styles/globals.css';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '~/lib/utils';
import { SessionProvider } from 'next-auth/react';
import { TVModeProvider } from '~/components/context/TVModeContext';

import { type Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Tech Tracker',
  description:
    'App used by COG IT employees to \
    update their status throughout the day.',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/images/tech_tracker_favicon.png',
    },
    {
      rel: 'apple-touch-icon',
      url: '/imges/tech_tracker_appicon.png',
    },
  ],
};

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <SessionProvider>
          <TVModeProvider>{children}</TVModeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
