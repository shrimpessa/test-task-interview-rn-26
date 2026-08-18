export type TNavigationProp = {
  navigate: (screen: 'ClientCard' | 'EmployeeProfile', params?: object) => void;
};

export type TEmployeeProfileRouteProp = {
  params?: { employeeId?: string };
};
