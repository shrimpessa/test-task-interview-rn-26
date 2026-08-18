import { useQuery } from '@tanstack/react-query';
import { getEmployee } from '../api/employee.api';
import { queryKeys } from '../api/queryKeys';

export const useEmployeeQuery = (employeeId: string) =>
  useQuery({
    queryKey: queryKeys.employee(employeeId),
    queryFn: () => getEmployee(employeeId),
  });
