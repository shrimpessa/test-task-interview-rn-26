import type { TEmployee } from '../types/employee';
import { mockEmployees } from './mocks/employee.mock';
import { fetchMockEntity } from './fetchMockEntity';

export const getEmployee = (employeeId: string): Promise<TEmployee> =>
  fetchMockEntity(mockEmployees, employeeId, 'Сотрудник');
