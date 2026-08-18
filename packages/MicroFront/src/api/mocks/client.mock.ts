import type { IClient } from '../../types/client';

export const DEFAULT_CLIENT_ID = 'client-1';

export const mockClients: Record<string, IClient> = {
  [DEFAULT_CLIENT_ID]: {
    id: DEFAULT_CLIENT_ID,
    companyName: 'ООО Альфа Технологии',
    status: 'active',
    inn: '7712345678',
    industry: { id: 'industry-retail', title: 'Розничная торговля' },
    segment: { id: 'segment-small-business', title: 'Малый бизнес' },
    manager: { id: 'employee-1', name: 'И. Петров' },
    phone: '+7 (999) 123-45-67',
    contacts: [
      {
        id: 'contact-1',
        name: 'А. Смирнова',
        position: 'Директор',
        phone: '+7 (999) 111-22-33',
      },
      {
        id: 'contact-2',
        name: 'В. Кузнецов',
        position: 'Бухгалтер',
        phone: '+7 (999) 444-55-66',
      },
    ],
  },
};
