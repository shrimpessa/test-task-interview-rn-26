const createQueryKey = <TEntity extends string>(entity: TEntity, id: string) =>
  [entity, id] as const;

export const queryKeys = {
  client: (clientId: string) => createQueryKey('client', clientId),
  employee: (employeeId: string) => createQueryKey('employee', employeeId),
};
