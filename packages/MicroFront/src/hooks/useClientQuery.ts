import { useQuery } from '@tanstack/react-query';
import { getClient } from '../api/client.api';
import { queryKeys } from '../api/queryKeys';

export const useClientQuery = (clientId: string) =>
  useQuery({
    queryKey: queryKeys.client(clientId),
    queryFn: () => getClient(clientId),
  });
