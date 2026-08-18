export type TClientStatus = 'active' | 'inactive';

export const CLIENT_STATUS_LABELS: Record<TClientStatus, string> = {
  active: 'Активный',
  inactive: 'Неактивный',
};

export type TContact = {
  id: string;
  name: string;
  position: string;
  phone: string;
};

export type TClientManager = {
  id: string;
  name: string;
};

export type TNamedEntity = {
  id: string;
  title: string;
};

// в проде инфоблоки могут быть описаны подробнее (например, сегмент и индустрия),
// как и профиль юзера в целом -- добавятся различные уровни доступа и т.п.
export interface IClient {
  id: string;
  companyName: string;
  status: TClientStatus;
  inn: string;
  industry: TNamedEntity;
  segment: TNamedEntity;
  manager: TClientManager;
  phone: string;
  contacts: TContact[];
}
