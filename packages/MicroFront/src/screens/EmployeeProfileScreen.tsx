import React from 'react';
import { AvatarHeader, InfoSection, ScreenScrollView, colors } from 'ui-kit';
import { QueryStateView } from '../components/QueryStateView';
import { useEmployeeQuery } from '../hooks/useEmployeeQuery';
import { withQueryClientProvider } from '../api/queryClient';
import { DEFAULT_EMPLOYEE_ID } from '../api/mocks/employee.mock';
import { openPhone, openEmail } from '../utils/linking';
import type { TEmployeeProfileRouteProp } from '../navigation/types';

const getUtcOffsetLabel = (timezone: string, date: Date): string => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'shortOffset',
  }).formatToParts(date);

  return parts.find((part) => part.type === 'timeZoneName')?.value ?? '';
};

const useTimeInTimezone = (timezone: string) => {
  const [now, setNow] = React.useState(() => new Date());

  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const currentTime = new Intl.DateTimeFormat('ru-RU', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
  }).format(now);

  return { currentTime, offsetLabel: getUtcOffsetLabel(timezone, now) };
};

type TEmployeeProfileScreenProps = {
  route: TEmployeeProfileRouteProp;
};

const EmployeeProfileScreenContent = ({ route }: TEmployeeProfileScreenProps) => {
  const employeeId = route.params?.employeeId ?? DEFAULT_EMPLOYEE_ID;
  const query = useEmployeeQuery(employeeId);

  const { currentTime, offsetLabel } = useTimeInTimezone(query.data?.timezone ?? 'UTC');

  return (
    <QueryStateView
      query={query}
      loadingLabel="Загружаем профиль сотрудника..."
      errorFallbackMessage="Не удалось загрузить сотрудника"
    >
      {(employee) => (
        <ScreenScrollView>
          <AvatarHeader
            title={employee.fullName}
            avatarColor={colors.violet}
            subtitleLines={[{ text: employee.position }]}
          />

          <InfoSection
            title="Основная информация"
            rows={[
              { label: 'Должность', value: employee.position },
              {
                label: 'Рабочий телефон',
                value: employee.workPhone,
                onPress: () => openPhone(employee.workPhone),
              },
              { label: 'Почта', value: employee.email, onPress: () => openEmail(employee.email) },
              { label: 'Подразделение', value: employee.department },
            ]}
          />

          <InfoSection
            title="Часовой пояс"
            rows={[
              { label: 'Часовой пояс', value: `${employee.timezone} (${offsetLabel})` },
              { label: 'Текущее время', value: currentTime },
            ]}
          />
        </ScreenScrollView>
      )}
    </QueryStateView>
  );
};

export const EmployeeProfileScreen = withQueryClientProvider(EmployeeProfileScreenContent);
