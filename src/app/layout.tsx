// import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
import NextAuthSessionProvider from '@/Providers/NextAuthSessionProvider';
import './globals.css';
import { Providers } from './providers';
import ContextProvider from './Context/ContextProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body> */}
      <NextAuthSessionProvider>
        <body>
          <ContextProvider>
            {' '}
            <Providers>{children}</Providers>
          </ContextProvider>
        </body>
      </NextAuthSessionProvider>
    </html>
  );
}
