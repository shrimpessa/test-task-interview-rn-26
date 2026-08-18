import type { IClient } from '../types/client';
import { mockClients } from './mocks/client.mock';
import { fetchMockEntity } from './fetchMockEntity';

export const getClient = (clientId: string): Promise<IClient> =>
  fetchMockEntity(mockClients, clientId, 'Клиент');
