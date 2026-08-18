import type { TEmployee } from '../../types/employee';

export const DEFAULT_EMPLOYEE_ID = 'employee-1';

export const mockEmployees: Record<string, TEmployee> = {
  [DEFAULT_EMPLOYEE_ID]: {
    id: DEFAULT_EMPLOYEE_ID,
    fullName: 'Иван Петров',
    position: 'Персональный менеджер',
    workPhone: '+7 (999) 000-11-22',
    email: 'i.petrov@example.com',
    department: 'Отдел обслуживания малого бизнеса',
    timezone: 'Europe/Moscow',
  },
};
