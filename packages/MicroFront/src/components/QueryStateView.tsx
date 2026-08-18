import React from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { LoadingState, ErrorState } from 'ui-kit';

type TQueryStateViewProps<TData> = {
  query: UseQueryResult<TData>;
  loadingLabel: string;
  errorFallbackMessage: string;
  children: (data: TData) => React.ReactNode;
};

export const QueryStateView = <TData,>({
  query,
  loadingLabel,
  errorFallbackMessage,
  children,
}: TQueryStateViewProps<TData>) => {
  if (query.isLoading) {
    return <LoadingState label={loadingLabel} />;
  }

  if (query.isError || !query.data) {
    return (
      <ErrorState
        message={query.error instanceof Error ? query.error.message : errorFallbackMessage}
        onRetry={query.refetch}
      />
    );
  }

  return <>{children(query.data)}</>;
};
