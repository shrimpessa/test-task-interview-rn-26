import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import {
  AvatarHeader,
  InfoSection,
  Section,
  PersonRow,
  DividedList,
  ScreenScrollView,
  Button,
  colors,
} from 'ui-kit';
import { QueryStateView } from '../components/QueryStateView';
import { useClientQuery } from '../hooks/useClientQuery';
import { withQueryClientProvider } from '../api/queryClient';
import { DEFAULT_CLIENT_ID } from '../api/mocks/client.mock';
import { CLIENT_STATUS_LABELS } from '../types/client';
import { openPhone } from '../utils/linking';
import type { TNavigationProp } from '../navigation/types';

type TClientCardScreenProps = {
  navigation: TNavigationProp;
};

const ClientCardScreenContent = ({ navigation }: TClientCardScreenProps) => {
  const query = useClientQuery(DEFAULT_CLIENT_ID);

  const handleCreateActivity = () => {
    Alert.alert('Активность', 'Создание активности пока не реализовано');
  };

  return (
    <QueryStateView
      query={query}
      loadingLabel="Загружаем карточку клиента..."
      errorFallbackMessage="Не удалось загрузить клиента"
    >
      {(client) => (
        <ScreenScrollView>
          <AvatarHeader
            title={client.companyName}
            subtitleLines={[
              { text: CLIENT_STATUS_LABELS[client.status], color: colors.success },
              { text: `ИНН ${client.inn}` },
            ]}
          />

          <InfoSection
            title="Основная информация"
            rows={[
              { label: 'Отрасль', value: client.industry.title },
              { label: 'Сегмент', value: client.segment.title },
              {
                label: 'Менеджер',
                value: client.manager.name,
                onPress: () =>
                  navigation.navigate('EmployeeProfile', { employeeId: client.manager.id }),
              },
              { label: 'Телефон', value: client.phone, onPress: () => openPhone(client.phone) },
            ]}
          />

          <Section title="Контакты">
            <DividedList>
              {client.contacts.map((contact) => (
                <PersonRow
                  key={contact.id}
                  name={contact.name}
                  position={contact.position}
                  phone={contact.phone}
                  onPressPhone={() => openPhone(contact.phone)}
                />
              ))}
            </DividedList>
          </Section>

          <Button
            label="Создать активность"
            onPress={handleCreateActivity}
            style={styles.activityButton}
          />
        </ScreenScrollView>
      )}
    </QueryStateView>
  );
};

export const ClientCardScreen = withQueryClientProvider(ClientCardScreenContent);

const styles = StyleSheet.create({
  activityButton: {
    marginHorizontal: 16,
    marginVertical: 20,
  },
});
