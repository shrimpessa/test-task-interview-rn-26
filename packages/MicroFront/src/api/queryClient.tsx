import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000,
    },
  },
});

export const withQueryClientProvider = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => (
      <QueryClientProvider client={queryClient}>
        <Component {...props} />
      </QueryClientProvider>
  );
};
