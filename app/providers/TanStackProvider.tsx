'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
 
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';
 
export default function TanStackProvider({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = new QueryClient();
 
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools /> {/* Devtools가 필요하다면 */}
    </QueryClientProvider>
  );
}