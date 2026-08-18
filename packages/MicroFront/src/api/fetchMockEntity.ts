import { simulateNetworkDelay } from './networkDelay';

export const fetchMockEntity = async <TEntity>(
  entities: Record<string, TEntity>,
  id: string,
  entityLabel: string,
): Promise<TEntity> => {
  await simulateNetworkDelay();

  const entity = entities[id];

  if (!entity) {
    throw new Error(`${entityLabel} с id "${id}" не найден`);
  }

  return entity;
};
