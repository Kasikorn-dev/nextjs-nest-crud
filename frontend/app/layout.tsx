'use client';
import { QueryClient, QueryClientProvider } from 'react-query';
import './globals.css';
import { createEmotionCache } from '@/lib/emotion-cache';
import { CacheProvider } from '@emotion/react';

const queryClient = new QueryClient();
const clientSideEmotionCache = createEmotionCache();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CacheProvider value={clientSideEmotionCache}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
