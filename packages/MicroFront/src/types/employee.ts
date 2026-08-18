// в проде инфоблоки могут быть описаны подробнее (например, позиция и подразделение),
// как и профиль юзера в целом -- добавятся различные уровни доступа и т.п.
export type TEmployee = {
  id: string;
  fullName: string;
  position: string;
  workPhone: string;
  email: string;
  department: string;
  timezone: string;
};
